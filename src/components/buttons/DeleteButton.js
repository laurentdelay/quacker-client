import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { FETCH_QUACKS } from "../../graphql/queries";
import { DELETE_QUACK } from "../../graphql/mutations";

function DeleteButton({ quackId, history }) {
  const [confirmPending, setConfirmPending] = useState(false);
  const [deleteQuack] = useMutation(DELETE_QUACK, {
    update(cache) {
      const { getPosts } = cache.readQuery({ query: FETCH_QUACKS });
      const filteredPosts = getPosts.filter((post) => post.id !== quackId);
      cache.writeQuery({
        query: FETCH_QUACKS,
        data: { getPosts: [...filteredPosts] },
      });
      history?.push("/");
    },
    onError(err) {
      console.log(err);
    },
    variables: { postId: quackId },
  });

  return (
    <>
      <Button
        color="red"
        floated="right"
        icon
        onClick={() => setConfirmPending(true)}
      >
        <Icon name="trash" />
      </Button>
      <Confirm
        open={confirmPending}
        content={"Supprimer le Quack ? Cette action est irréversible"}
        cancelButton="Annuler"
        confirmButton="Supprimer"
        onCancel={() => setConfirmPending(false)}
        onConfirm={deleteQuack}
      />
    </>
  );
}

export default DeleteButton;
