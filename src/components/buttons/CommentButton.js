import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";

function CommentButton({ user, quackData: { id: quackId, commentsCount } }) {
  return (
    <Button as="div" labelPosition="right">
      <Button basic color="blue" as={Link} to={`/quack/${quackId}`}>
        <Icon name="comments" />
      </Button>
      <Label basic color="blue" pointing="left">
        {commentsCount}
      </Label>
    </Button>
  );
}

export default CommentButton;
