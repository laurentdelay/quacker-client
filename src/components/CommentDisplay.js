import React from "react";
import { Comment } from "semantic-ui-react";

import { elapsedTime } from "../utils/functions";
import DeleteCommentAction from "./buttons/DeleteCommentAction";

function CommentDisplay({
  user,
  quackId,
  comment: { id, body, createdAt, username },
}) {
  return (
    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/large/steve.jpg" />
      <Comment.Content>
        <Comment.Author as="a">{username}</Comment.Author>
        <Comment.Metadata>
          <div>{elapsedTime(createdAt)}</div>
        </Comment.Metadata>
        <Comment.Text>{body}</Comment.Text>
        <Comment.Actions>
          {user?.username === username && (
            <DeleteCommentAction quackId={quackId} commentId={id} />
          )}
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
}

export default CommentDisplay;
