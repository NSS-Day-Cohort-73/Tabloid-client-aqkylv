import { useEffect, useState } from "react";
import { Row } from "reactstrap";
import { getReactions } from "../../managers/reactionManager";
import ReactionItem from "./ReactionItem";
import "./ReactionStyles.css";

function ReactionBar({ postId, loggedInUser }) {
  const [reactions, setReactions] = useState([]);
  const getAndSetReaction = async () => {
    const res = await getReactions();
    setReactions(res);
  };
  useEffect(() => {
    getAndSetReaction();
  }, []);
  return (
    <Row className="gx-0 reaction-bar">
      {reactions.map((reaction) => (
        <ReactionItem
          key={reaction.id}
          reaction={reaction}
          postId={postId}
          loggedInUser={loggedInUser}
        />
      ))}
    </Row>
  );
}
export default ReactionBar;
