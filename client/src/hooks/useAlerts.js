import { useState } from 'react';

export function useAlerts(queryKey, fetchFn) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showVerifyStatusModal, setShowVerifyStatusModal] = useState(false);
  const [alertType, setAlertType] = useState();
  const [rowChanged, setRowChanged] = useState(true);
  const [selectedUser, setSelectedUser] = useState();

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const hideInviteModal = function () {
    setShowInviteModal(false);
  };
  const hideDeleteModal = function () {
    setShowDeleteModal(false);
  };

  const hideVerifyStatus = function () {
    setShowVerifyStatusModal(false);
  };

  const showVerifyStatus = function (email) {
    setShowVerifyStatusModal(true);
    setSelectedUser(email);
  };

  const hideInviteModalAndShowSuccess = function () {
    setShowInviteModal(false);
    setAlertType({
      type: 'success',
      message: 'Invitation Sent Successfully',
    });
  };

  const hideDeleteModalAndShowSuccess = function () {
    setShowDeleteModal(false);
    setAlertType({
      type: 'success',
      message: 'Deleted Successfully',
    });
    setRowChanged((prev) => !prev);
  };

  const hideVerifyModalAndShowSuccess = function () {
    setShowVerifyStatusModal(false);
    setAlertType({
      type: 'success',
      message: 'User Verified Successfully',
    });
    setRowChanged((prev) => !prev);
  };

  return {
    removeAlertType,
    hideInviteModal,
    hideDeleteModal,
    hideVerifyStatus,
    showVerifyStatus,
    hideInviteModalAndShowSuccess,
    hideDeleteModalAndShowSuccess,
    hideVerifyModalAndShowSuccess,
    showInviteModal,
    showDeleteModal,
    showVerifyStatusModal,
    alertType,
    rowChanged,
    selectedUser,
    setShowDeleteModal,
    setShowInviteModal,
  };
}
