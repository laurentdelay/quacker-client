import React, { useState } from "react";
import { Button, Form, Header, List, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../../utils/hooks";
import { useAuth } from "../../context/Auth";
import { REGISTER } from "../../graphql/mutations";

function Register({ history }) {
  const [registerErrors, setRegisterErrors] = useState(null);
  const { login } = useAuth();

  const [addUser, { loading: registerLoading }] = useMutation(REGISTER, {
    update(_, { data: { register: userData } }) {
      login(userData);
      history.push("/");
    },
    onError(err) {
      setRegisterErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const { userInputs, handleInputChange, handleSubmit } = useForm(addUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="form-container">
      <Header as="h1" textAlign="center">
        Créer un compte
      </Header>
      <Form onSubmit={handleSubmit} loading={registerLoading}>
        <Form.Input
          label="Pseudo:"
          type="text"
          name="username"
          required
          placeholder="Pseudo..."
          value={userInputs.username}
          error={registerErrors?.username ? true : false}
          onChange={handleInputChange}
        />
        <Form.Input
          label="Email:"
          type="email"
          name="email"
          required
          placeholder="abc@mail.com"
          value={userInputs.email}
          error={registerErrors?.email ? true : false}
          onChange={handleInputChange}
        />
        <Form.Input
          label="Mot de passe:"
          type="password"
          name="password"
          required
          value={userInputs.password}
          error={registerErrors?.password ? true : false}
          onChange={handleInputChange}
        />
        <Form.Input
          label="Confirmer le mot de passe:"
          type="password"
          name="confirmPassword"
          required
          value={userInputs.confirmPassword}
          error={registerErrors?.confirmPassword ? true : false}
          onChange={handleInputChange}
        />
        <Button type="submit" color="teal" fluid>
          Créer un compte
        </Button>
      </Form>
      {registerErrors && (
        <Message error>
          <List>
            {Object.values(registerErrors).map((value) => {
              return <List.Item key={value}>{value}</List.Item>;
            })}
          </List>
        </Message>
      )}
    </div>
  );
}

export default Register;
