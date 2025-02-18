import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import {
  getAllPostTags,
  updatePostTags,
  getAllTags,
} from "../../managers/tagManager"; // Import the correct function

import "./PostStyle.css";
import TagModal from "../tags/TagModal";

const PostTags = ({ post }) => {
  const [postTags, setPostTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const getAndSetPostTags = async () => {
    const fetchedPostTags = await getAllPostTags(post.id);

    setPostTags(fetchedPostTags);
  };

  const getAndSetAllTags = async () => {
    const fetchedTags = await getAllTags();
    setAllTags(fetchedTags);
  };

  useEffect(() => {
    if (post.id) {
      getAndSetPostTags();
      getAndSetAllTags();
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
        allTags={allTags}
        postId={post.id}
      />
      {postTags.length > 0 ? (
        <Row>
          {postTags.map((postTag, index) => (
            <Col xs={2} key={index} className="post-tag m-2 p-1">
              #{postTag.tag.name}
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
