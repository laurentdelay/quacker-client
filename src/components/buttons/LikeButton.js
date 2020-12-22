import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import { LIKE_QUACK } from "../../graphql/mutations";

function LikeButton({ user, quackData: { likesCount, likes, id: quackId } }) {
  const [likedQuack, setLikedQuack] = useState(false);

  useEffect(() => {
    setLikedQuack(
      user && likes.find((like) => like.username === user.username)
    );
  }, [likes, user]);

  const [likeQuack] = useMutation(LIKE_QUACK, {
    onError(err) {
      console.error(err);
    },
    variables: { postId: quackId },
  });

  const likeButton = user ? (
    <Button basic={!likedQuack} color="teal" onClick={likeQuack}>
      <Icon name="heart" />
    </Button>
  ) : (
    <Button basic color="teal" as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  );
  return (
    <Button as="div" labelPosition="right">
      {likeButton}
      <Label basic color="teal" pointing="left">
        {likesCount}
      </Label>
    </Button>
  );
}

export default LikeButton;
