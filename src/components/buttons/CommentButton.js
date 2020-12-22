import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import InfoPopup from "../InfoPopup";

function CommentButton({ quackData: { id: quackId, commentsCount } }) {
  return (
    <Button as="div" labelPosition="right">
      <InfoPopup content="Commenter le Quack">
        <Button basic color="blue" as={Link} to={`/quack/${quackId}`}>
          <Icon name="comments" />
        </Button>
      </InfoPopup>
      <Label basic color="blue" pointing="left">
        {commentsCount}
      </Label>
    </Button>
  );
}

export default CommentButton;
