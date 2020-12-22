import React from "react";
import { Button, Comment, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../utils/hooks";
import { COMMENT_QUACK } from "../graphql/mutations";

function CommentForm({ user: { username }, quackId: postId }) {
  const [commentPost, { loading: commentLoading }] = useMutation(
    COMMENT_QUACK,
    {
      update() {
        userInputs.body = "";
      },
    }
  );

  const { userInputs, handleInputChange, handleSubmit } = useForm(commentPost, {
    postId,
    body: "",
  });
  return (
    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/large/steve.jpg" />
      <Comment.Content>
        <Comment.Author as="a">{username}</Comment.Author>

        <Comment.Text>
          <Form loding={commentLoading} onSubmit={handleSubmit}>
            <Form.TextArea
              name="body"
              value={userInputs.body}
              onChange={handleInputChange}
            />
            <Button type="submit" color="teal">
              Commenter
            </Button>
          </Form>
        </Comment.Text>
      </Comment.Content>
    </Comment>
  );
}

export default CommentForm;
