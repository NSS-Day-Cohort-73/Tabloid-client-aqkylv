import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import { getAllPostTags, updatePostTags } from "../../managers/tagManager";
import TagModal from "../tags/TagModal";
import "./PostStyle.css";

const PostTags = ({ post }) => {
  const [postTags, setPostTags] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const getAndSetPostTags = async () => {
    const response = await getAllPostTags(post.id);
    setPostTags(response);
  };

  useEffect(() => {
    if (post.id) {
      getAndSetPostTags();
    }
  }, [post.id]);

  const toggleModal = () => setModalOpen(!modalOpen);

  const saveTags = async () => {
    await updatePostTags(post.id, postTags);
    toggleModal();
  };

  return (
    <div className="">
      <Button color="primary" onClick={toggleModal}>
        Manage Tags
      </Button>
      <TagModal
        isOpen={modalOpen}
        toggle={toggleModal}
        postTags={postTags}
        setPostTags={setPostTags}
        saveTags={saveTags}
      />
      {postTags.length > 0 ? (
        <Row>
          {postTags.map((tag, index) => (
            <Col xs={2} key={index} className="post-tag mx-2 p-1">
              #{tag.name}
            </Col>
          ))}
        </Row>
      ) : (
        <span>No tags available</span>
      )}
    </div>
  );
};

export default PostTags;
