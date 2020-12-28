import React from "react";
import { useQuery } from "@apollo/client";
import { Grid, Header, Message, Transition } from "semantic-ui-react";

import QuackCard from "../QuackCard";
import QuackForm from "../QuackForm";
import { FETCH_QUACKS } from "../../graphql/queries";
import { useAuth } from "../../context/Auth";
import LoadingDimmer from "../LoadingDimmer";

function Home() {
  const { user } = useAuth();
  const { loading, error, data } = useQuery(FETCH_QUACKS);

  const quacks = data?.getPosts;

  let content = null;

  if (loading) {
    content = <LoadingDimmer active>Chargement des quacks...</LoadingDimmer>;
  } else if (error) {
    content = (
      <Grid.Row columns={1} centered only>
        <Message error compact>
          Une erreur est survenue, impossible de charger les quacks.
        </Message>
      </Grid.Row>
    );
  } else {
    content = (
      <Grid.Row columns={3} stretched>
        {user && (
          <Grid.Column className="home-card">
            <QuackForm />
          </Grid.Column>
        )}
        <Transition.Group duration={500} animation="fly right">
          {quacks &&
            quacks.map((quack) => (
              <Grid.Column key={quack.id} className="home-card">
                <QuackCard key={quack.id} quackData={quack} />
              </Grid.Column>
            ))}
        </Transition.Group>
      </Grid.Row>
    );
  }

  return (
    <Grid>
      <Grid.Row columns={1} centered>
        <Header as="h1">Quacks récents</Header>
      </Grid.Row>
      {content}
    </Grid>
  );
}

export default Home;
