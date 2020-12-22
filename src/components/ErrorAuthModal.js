import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "semantic-ui-react";
import { useAuth } from "../context/Auth";

function ErrorAuthModal() {
  const history = useHistory();
  const { authErrorMessage, logout, clearError } = useAuth();

  const handleConnectClick = () => {
    clearError();

    logout();
    history.push("/login");
  };

  const handleClose = () => {
    clearError();
    logout();
  };

  return (
    <Modal
      closeIcon={true}
      closeOnDimmerClick={true}
      closeOnEscape={true}
      open={authErrorMessage ? true : false}
      size="mini"
      onClose={handleClose}
    >
      <Modal.Content>{authErrorMessage}</Modal.Content>
      <Modal.Actions>
        <Button onClick={handleConnectClick} color="teal">
          Se connecter
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ErrorAuthModal;
