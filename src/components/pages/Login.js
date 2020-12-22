import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form, Header, List, Message } from "semantic-ui-react";

import { useForm } from "../../utils/hooks";
import { useAuth } from "../../context/Auth";
import { LOGIN } from "../../graphql/mutations";

function Login({ history }) {
  const [loginErrors, setLoginErrors] = useState(null);
  const { login } = useAuth();
  const [logUser, { loading: loginLoading }] = useMutation(LOGIN, {
    update(_, { data: { login: userData } }) {
      login(userData);
      history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setLoginErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const { userInputs, handleInputChange, handleSubmit } = useForm(logUser, {
    username: "",
    password: "",
  });

  return (
    <div className="form-container">
      <Header as="h1" textAlign="center">
        Connexion
      </Header>
      <Form onSubmit={handleSubmit} loading={loginLoading}>
        <Form.Input
          label="Pseudo:"
          placeholder="Pseudo..."
          type="text"
          name="username"
          value={userInputs.username}
          error={loginErrors?.username ? true : false}
          onChange={handleInputChange}
        />
        <Form.Input
          label="Mot de passe:"
          type="password"
          name="password"
          value={userInputs.password}
          error={loginErrors?.password ? true : false}
          onChange={handleInputChange}
        />
        <Button type="submit" color="teal" fluid>
          Se connecter
        </Button>
      </Form>
      {loginErrors && (
        <Message error>
          <List>
            {Object.values(loginErrors).map((value) => {
              return <List.Item key={value}>{value}</List.Item>;
            })}
          </List>
        </Message>
      )}
    </div>
  );
}

export default Login;
