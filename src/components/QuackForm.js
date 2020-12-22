import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";

import { useForm } from "../utils/hooks";
import { ADD_QUACK } from "../graphql/mutations";
import { FETCH_QUACKS } from "../graphql/queries";

function QuackForm() {
  const [quackingErrors, setQuackingErrors] = useState(null);

  const [createQuack, { loading: quackPostLoading }] = useMutation(ADD_QUACK, {
    update(cache, { data: { createPost } }) {
      const { getPosts } = cache.readQuery({ query: FETCH_QUACKS });

      cache.writeQuery({
        query: FETCH_QUACKS,
        data: { getPosts: [createPost, ...getPosts] },
      });
    },
    onError(err) {
      setQuackingErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const { userInputs, handleInputChange, handleSubmit } = useForm(
    createQuack,
    {
      body: "",
    },
    "Vous devez être connecté pour Quacker",
    "quackBody"
  );

  return (
    <div>
      <Form onSubmit={handleSubmit} loading={quackPostLoading}>
        <h2>Ajouter un Quack</h2>
        <Form.Input
          name="body"
          type="text"
          placeholder="Hello there!"
          onChange={handleInputChange}
          value={userInputs.body}
        />
        <Button type="submit" color="teal" fluid>
          Quack!
        </Button>
      </Form>
      {quackingErrors && (
        <Message error>
          {Object.values(quackingErrors).map((value) => {
            return <p key={value}>{value}</p>;
          })}
        </Message>
      )}
    </div>
  );
}

export default QuackForm;
