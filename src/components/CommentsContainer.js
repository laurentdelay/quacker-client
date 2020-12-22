import React from "react";
import { Comment, Header } from "semantic-ui-react";
import CommentDisplay from "./CommentDisplay";
import CommentForm from "./CommentForm";

function CommentsContainer({ comments, user, quackId }) {
  const commentsContent =
    comments?.length > 0 ? (
      comments.map((comment) => (
        <CommentDisplay
          key={comment.id}
          comment={comment}
          quackId={quackId}
          user={user}
        />
      ))
    ) : (
      <Comment>
        Aucun commentaire pour le moment,{" "}
        {user ? "ajoutez" : "connectez-vous pour ajouter"} le premier!
      </Comment>
    );

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Commentaires
      </Header>
      {user && <CommentForm user={user} quackId={quackId} />}

      {commentsContent}
    </Comment.Group>
  );
}

export default CommentsContainer;
