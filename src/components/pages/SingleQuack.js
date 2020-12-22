import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { Card, Grid, Image, Message } from "semantic-ui-react";
import { useAuth } from "../../context/Auth";

import { FETCH_SINGLE_QUACK } from "../../graphql/queries";
import { elapsedTime } from "../../utils/functions";
import CommentButton from "../buttons/CommentButton";
import DeleteButton from "../buttons/DeleteButton";
import LikeButton from "../buttons/LikeButton";
import CommentsContainer from "../CommentsContainer";
import LoadingDimmer from "../LoadingDimmer";

function SingleQuack() {
  const { quackId } = useParams();

  const { loading, error, data } = useQuery(FETCH_SINGLE_QUACK, {
    onError(err) {
      console.log(err.graphQLErrors[0]);
    },
    variables: {
      postId: quackId,
    },
  });

  const { user } = useAuth();

  let displayedContent = null;
  if (loading) {
    displayedContent = <LoadingDimmer>Récupération du Quack</LoadingDimmer>;
  } else if (error) {
    displayedContent = <Message error>Une erreur est survenue.</Message>;
  } else if (data) {
    const {
      id,
      username,
      createdAt,
      body,
      comments,
      likes,
      likesCount,
      commentsCount,
    } = data.getPost;

    displayedContent = (
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            />
          </Grid.Column>
          <Grid.Column width={9}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{elapsedTime(createdAt)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <LikeButton
                  user={user}
                  quackData={{ id, likesCount, likes }}
                  likesCount={likesCount}
                />

                <CommentButton quackData={{ id, commentsCount }} user={user} />
                {username === user?.username && <DeleteButton quackId={id} />}
              </Card.Content>
              <Card.Content extra>
                <CommentsContainer
                  comments={comments}
                  user={user}
                  quackId={id}
                />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  } else {
    displayedContent = <div>Il n'y a rien à afficher ici</div>;
  }
  return displayedContent;
}

export default SingleQuack;
