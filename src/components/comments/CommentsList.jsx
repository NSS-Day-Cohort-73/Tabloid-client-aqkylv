import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import { useParams } from "react-router-dom";
import { getAllComments } from "../../managers/commentManager";
import { Container } from "reactstrap";

function CommentsList({ loggedInUser }) {
  const [comments, setComments] = useState([]);
  const { postId } = useParams();

  const getAndSetComments = () => {
    getAllComments(postId).then(setComments);
  };

  useEffect(() => {
    getAndSetComments();
  }, []);

  return (
    <Container>
      <h2 className="text-center" style={{ color: "var(--black)" }}>
        {comments[0]?.post?.title}
      </h2>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          loggedInUser={loggedInUser}
          comment={comment}
          getAndSet={getAndSetComments}
        />
      ))}
    </Container>
  );
}

export default CommentsList;
