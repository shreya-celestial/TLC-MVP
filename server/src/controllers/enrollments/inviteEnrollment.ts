import { Request, Response } from 'express';
import getData from '../../utils/getData';
import { checkEnrollmentAvailability } from '../../gql/enrollments/queries';
import CryptoJS from "crypto-js"
import { capitaliseStr, mailing_url } from '../../utils/global';
import { deleteEnrollmentInvite, newEnrollmentInvite, resendEnrollmentInvite } from '../../gql/enrollments/mutations';
import generateEmail from '../../utils/generateMail';
import transporter from '../../utils/nodeMailer';

const inviteEnrollment = async (req: Request, res: Response) => {
	const { email, mobile, name, invitedBy } = req?.body;

	const isEnrollmentAvailable = await getData(checkEnrollmentAvailability, { email });

	if (isEnrollmentAvailable?.errors) {
		return res.status(400).json({
			status: 'error',
			message: isEnrollmentAvailable?.errors[0]?.message,
		});
	}

	if (isEnrollmentAvailable?.data?.enrollments?.length) {
		return res.status(400).json({
			status: 'error',
			message: "Email already enrolled!"
		})
	}

	if (!isEnrollmentAvailable?.data?.enrollment_invites?.length) {
		let token: any = CryptoJS.AES.encrypt(email, process.env.CRYPTO_TICKET || '')
		token = token.toString();
		const variables = {
			name: capitaliseStr(name),
			email: email.toLowerCase(),
			token,
			mobile,
			invited_by: invitedBy ? invitedBy.toLowerCase() : null
		}

		const data = await getData(newEnrollmentInvite, variables);
		if (data?.errors) {
			return res.status(400).json({
				status: 'error',
				message: data?.errors[0]?.message
			})
		}

		if (data?.data?.insert_enrollment_invites?.affected_rows) {
			const body = "TLC invites you to enrol at TLC."
			const mailOptions = {
				from: 'thelastcentre.techinfo@gmail.com',
				to: email,
				subject: 'TLC Enrollment Invitation',
				text: '',
				html: generateEmail(`${mailing_url}/enrollments/verifyInvite?invite=${token}`, name, 'Accept Invitation', body)
			};

			transporter.sendMail(mailOptions, async (err) => {
				if (!err) {
					return res.status(200).json({
						status: 'success',
						message: 'Invitation sent successfully!'
					})
				}

				start_position: while (true) {
					const deleteSentInvite = await getData(deleteEnrollmentInvite, { email, token });
					if (deleteSentInvite?.errors) {
						continue start_position
					}
					break;
				}
				return res.status(400).json({
					status: 'error',
					message: "Something went wrong! Please try again!"
				})

			})
			return
		}

		return res.status(400).json({
			status: 'error',
			message: "Something went wrong! Please try again!"
		})
	}

	const created = new Date(isEnrollmentAvailable?.data?.enrollment_invites[0]?.created_at).toLocaleDateString();
	const today = new Date().toLocaleDateString();

	if (created === today) {
		return res.status(400).json({
			status: 'error',
			message: 'Invitation has already been sent today!'
		})
	}

	let token: any = CryptoJS.AES.encrypt(email, process.env.CRYPTO_TICKET || '')
	token = token.toString();
	const variables = {
		email: email.toLowerCase(),
		token
	}
	const data = await getData(resendEnrollmentInvite, variables);
	if (data?.errors) {
		return res.status(400).json({
			status: 'error',
			message: data?.errors[0]?.message
		})
	}
	if (data?.data?.update_enrollment_invites?.affected_rows) {
		const body = "TLC invites you to enrol at TLC."
		const mailOptions = {
			from: 'thelastcentre.techinfo@gmail.com',
			to: email,
			subject: 'TLC Enrollment Invitation',
			text: '',
			html: generateEmail(`${mailing_url}/enrollments/verifyInvite?invite=${token}`, name, 'Accept Invitation', body)
		};

		transporter.sendMail(mailOptions, async (err) => {
			if (!err) {
				return res.status(200).json({
					status: 'success',
					message: 'Invitation re-sent successfully!'
				})
			}

			return res.status(400).json({
				status: 'error',
				message: "Something went wrong! Please try again!"
			})

		})
		return
	}

	return res.status(400).json({
		status: 'error',
		message: "Something went wrong! Please try again!"
	})

};

export default inviteEnrollment;
