import { useEditor } from "@tiptap/react";
import { useEffect, useState } from "react";
import {
  addPostReaction,
  deletePostReaction,
  getPostReactions,
} from "../../managers/reactionManager";
import { Col } from "reactstrap";

function ReactionItem({ reaction, loggedInUser, postId }) {
  const [postReactions, setPostReactions] = useState(null);
  const [userReacted, setUserReacted] = useState(false);

  const getAndSetPostReaction = async () => {
    const res = await getPostReactions(postId, reaction.id);
    setPostReactions(res);
    setUserReacted(res?.some((pr) => pr?.userProfileId === loggedInUser?.id));
  };

  useEffect(() => {
    getAndSetPostReaction();
  }, []);

  const handleAddPostReaction = async () => {
    const newPostReaction = {
      postId: postId,
      reactionId: reaction.id,
      userProfileId: loggedInUser.id,
    };
    await addPostReaction(newPostReaction);

    getAndSetPostReaction();
  };
  const handleDeletePostReaction = async () => {
    await deletePostReaction(postId, loggedInUser.id, reaction.id);
    getAndSetPostReaction();
  };

  return (
    <Col
      className="reaction-item ms-3"
      xs="auto"
      onClick={() => {
        userReacted ? handleDeletePostReaction() : handleAddPostReaction();
      }}
    >
      <span>{reaction.icon}</span>
      <span>{postReactions?.length}</span>
    </Col>
  );
}
export default ReactionItem;
