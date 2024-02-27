const generateEmail = (url: string, name: string, linkName:string = 'Verify' , body:string = 'Welcome to The Last Centre, Please verify your email to continue.') => {
  const email = `<body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
      <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
        <tbody>
          <tr style="width:100%">
            <td>
              <p style="color:black; font-size:16px;line-height:26px;margin:16px 0">Hi <!-- -->${name}<!-- -->,</p>
              <p style="color:black; font-size:16px;line-height:26px;margin:16px 0">${body}</p>
              <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center">
                <tbody>
                  <tr>
                    <td><a href="${url}" style="background-color:#259311;border-radius:3px;color:#fff;font-size:16px;text-decoration:none;text-align:center;display:inline-block;padding:12px 12px 12px 12px;line-height:100%;max-width:100%" target="_blank"><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">${linkName}</span><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                  </tr>
                </tbody>
              </table>
              <p style="color:black; font-size:16px;line-height:26px;margin:16px 0">Best,<br />The Last Centre Team</p>
              <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
            </td>
          </tr>
        </tbody>
      </table>
    </body>`;
  return email;
}
 
export default generateEmail