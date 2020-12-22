import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Comment, Confirm } from "semantic-ui-react";
import { useAuth } from "../../context/Auth";

import { DELETE_COMMENT } from "../../graphql/mutations";

function DeleteCommentAction({ quackId, commentId }) {
  const [confirmPending, setConfirmPending] = useState(false);
  const { checkAuth } = useAuth();

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    onError(err) {
      console.log(err.graphQLErrors);
    },
    variables: { postId: quackId, commentId },
  });

  const handleDeleteClick = () => {
    const errorMessage =
      "Vous devez être connecté pour supprimer un commentaire.";

    if (checkAuth(errorMessage)) {
      setConfirmPending(true);
    }
  };

  const handleCancel = () => {
    setConfirmPending(false);
  };

  return (
    <>
      <Comment.Action onClick={handleDeleteClick}>Supprimer</Comment.Action>
      <Confirm
        cancelButton="Annuler"
        confirmButton="Supprimer"
        closeOnEscape={true}
        closeOnDimmerClick={true}
        closeIcon={true}
        onClose={handleCancel}
        onCancel={handleCancel}
        onConfirm={deleteComment}
        content="Supprimer le commentaire?"
        open={confirmPending}
      />
    </>
  );
}

export default DeleteCommentAction;
