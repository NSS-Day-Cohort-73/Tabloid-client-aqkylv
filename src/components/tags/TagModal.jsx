import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const TagModal = ({
  isOpen,
  toggle,
  postTags,
  setPostTags,
  saveTags,
  allTags,
  postId
}) => {
  const handleCheckboxChange = (tagId) => {
    if (postTags.some((pt) => pt.tag.id === tagId)) {
      setPostTags(postTags.filter((pt) => pt.tag.id !== tagId));
    } else {
      const foundTag = allTags.find((t) => t.id === tagId);
      if (foundTag) {
        setPostTags([...postTags, { tag: foundTag, postId: postId, tagId: tagId }]);
      }
    }
  };

  const onSave = () => {
    saveTags();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Tag</ModalHeader>
      <ModalBody>
        <Form>
          {allTags.map((tag) => (
            <FormGroup check key={tag.id}>
              <Label check>
                <Input
                  type="checkbox"
                  checked={postTags.some((pt) => pt.tag.id === tag.id)}
                  onChange={() => handleCheckboxChange(tag.id)}
                />
                {tag.name}
              </Label>
            </FormGroup>
          ))}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
        <Button color="primary" onClick={onSave}>
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TagModal;
