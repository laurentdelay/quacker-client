import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/Auth";
import DeleteButton from "./buttons/DeleteButton";
import LikeButton from "./buttons/LikeButton";
import CommentButton from "./buttons/CommentButton";
import { elapsedTime } from "../utils/functions";

function QuackCard({
  quackData: {
    id,
    body,
    createdAt,
    username,
    likes,
    likesCount,
    commentsCount,
  },
}) {
  const { user } = useAuth();

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/quack/${id}`}>
          {elapsedTime(createdAt)}
        </Card.Meta>
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
    </Card>
  );
}

export default QuackCard;
