import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "semantic-ui-react";
import { useAuth } from "../context/Auth";

function ErrorAuthModal() {
  const history = useHistory();

  const { authErrorMessage, logout, clearError } = useAuth();

  const handleConnectClick = () => {
    clearError();

    const path = history.location.pathname;
    let redirect = "/login";

    if (path !== "/") {
      const redirectInfo = path.split("/");

      // ajout de la page actuelle pour la redirection
      redirect += `?previousPage=${redirectInfo[1]}`;

      // si une ID est fournie, on l'ajoute
      if (redirectInfo.length > 2) {
        redirect += `&id=${redirectInfo[2]}`;
      }
    }
    history.push(redirect);
  };

  return (
    <Modal
      closeIcon={true}
      closeOnDimmerClick={true}
      closeOnEscape={true}
      open={authErrorMessage ? true : false}
      size="tiny"
      onClose={clearError}
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
