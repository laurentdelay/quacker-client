import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";

import { useAuth } from "../../context/Auth";
import { LIKE_QUACK } from "../../graphql/mutations";
import InfoPopup from "../InfoPopup";

function LikeButton({ quackData: { likesCount, likes, id: quackId } }) {
  const [likedQuack, setLikedQuack] = useState(false);
  const { user, checkAuth } = useAuth();

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

  const handleLikeClick = () => {
    const errorMessage = "Vous devez être connecté pour liker.";
    if (checkAuth(errorMessage)) {
      likeQuack();
    }
  };

  return (
    <>
      <Button as="div" labelPosition="right">
        <InfoPopup content="Like">
          <Button basic={!likedQuack} color="teal" onClick={handleLikeClick}>
            <Icon name="heart" />
          </Button>
        </InfoPopup>
        <Label basic color="teal" pointing="left">
          {likesCount}
        </Label>
      </Button>
    </>
  );
}

export default LikeButton;
