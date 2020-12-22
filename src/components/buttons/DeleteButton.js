import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { FETCH_QUACKS } from "../../graphql/queries";
import { DELETE_QUACK } from "../../graphql/mutations";
import { useAuth } from "../../context/Auth";
import InfoPopup from "../InfoPopup";

function DeleteButton({ quackId }) {
  const [confirmPending, setConfirmPending] = useState(false);

  const { checkAuth } = useAuth();

  const [deleteQuack] = useMutation(DELETE_QUACK, {
    update(cache) {
      const { getPosts } = cache.readQuery({ query: FETCH_QUACKS });
      const filteredPosts = getPosts.filter((post) => post.id !== quackId);
      cache.writeQuery({
        query: FETCH_QUACKS,
        data: { getPosts: [...filteredPosts] },
      });
    },
    onError(err) {
      console.error(err.graphQLErrors[0].message);
    },
    variables: { postId: quackId },
  });

  const handleDeleteClick = () => {
    const errorText = "Vous devez être connecté pour supprimer un Quack.";
    if (checkAuth(errorText)) {
      setConfirmPending(true);
    }
  };

  return (
    <>
      <InfoPopup content="Supprimer le Quack">
        <Button color="red" floated="right" icon onClick={handleDeleteClick}>
          <Icon name="trash" />
        </Button>
      </InfoPopup>
      <Confirm
        open={confirmPending}
        size="mini"
        content={"Supprimer le Quack ?"}
        cancelButton="Annuler"
        confirmButton="Supprimer"
        onCancel={() => setConfirmPending(false)}
        onConfirm={deleteQuack}
      />
    </>
  );
}

export default DeleteButton;
