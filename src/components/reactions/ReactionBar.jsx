import { useEffect, useState, useRef } from "react";
import { Row, Button, Col } from "reactstrap";
import { getReactions, addReaction } from "../../managers/reactionManager";
import ReactionItem from "./ReactionItem";
import Picker from "emoji-picker-react";
import "./ReactionStyles.css";

function ReactionBar({ postId, loggedInUser }) {
  const [reactions, setReactions] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  // Fetch reactions
  const getAndSetReactions = async () => {
    const res = await getReactions();
    setReactions(res);
  };

  useEffect(() => {
    getAndSetReactions();
  }, []);

  const handleAddReaction = async (emojiData) => {
    console.log("Selected Emoji Data:", emojiData); // Debugging

    if (!loggedInUser) return;

    const newReaction = {
      name: emojiData.names[0], // First name from the array, e.g., "grinning face"
      icon: emojiData.emoji, // The actual emoji, e.g., "😀"
    };

    console.log("New Reaction Payload:", newReaction); // Check before sending

    await addReaction(newReaction);
    await getAndSetReactions();

    setShowPicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <Row className="gx-0 reaction-bar">
      <Col>
        <Row className="gx-0 reaction-bar">
          {reactions.map((reaction) => (
            <ReactionItem
              key={reaction.id}
              reaction={reaction}
              postId={postId}
              loggedInUser={loggedInUser}
              showPicker={showPicker}
              setShowPicker={setShowPicker}
            />
          ))}
        </Row>
        {/* Add Reaction Button */}

        {/* Emoji Picker (Shows on button click) */}
        {showPicker && (
          <div ref={pickerRef}>
            <Picker onEmojiClick={handleAddReaction} />
          </div>
        )}
      </Col>
      <Col>
        <div
          className="reaction-plus"
          onClick={() => setShowPicker(!showPicker)}
        >
          +
        </div>
      </Col>
    </Row>
  );
}

export default ReactionBar;
