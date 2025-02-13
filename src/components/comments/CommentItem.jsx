import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { deleteComment } from "../../managers/commentManager";
import { useNavigate } from "react-router-dom";

function CommentItem({ loggedInUser, comment, getAndSet }) {
  const [commentDate, setCommentDate] = useState("");
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  // Function to format ISO date
  function formatISOToCustom(isoString) {
    const date = new Date(isoString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${month}/${day}/${year} at ${hours}:${formattedMinutes} ${ampm}`;
  }

  useEffect(() => {
    setCommentDate(formatISOToCustom(comment.creationDate));
  }, [comment.creationDate]);

  const handleDelete = async () => {
    deleteComment(comment.id).then(() => {
      getAndSet();
      setModal(false);
    });
  };

  return (
    <>
      <Row className="my-2 bg-light border">
        <Col xs={1}>
          <img
            src={comment.author.profilePicture || "https://picsum.photos/75"}
            className="rounded-circle p-1"
            alt={`Profile picture for ${comment.author.fullName}`}
          />
        </Col>
        <Col className="border-start">
          <Row
            className="fw-bold p-2"
            style={{ backgroundColor: "var(--green)" }}
          >
            <Col xs={6} className="text-start">
              {comment.subject}
            </Col>
            <Col xs={6} className="text-end">
              Posted on {commentDate} by {comment.author.fullName}
            </Col>
          </Row>
          <Row>
            <Col>
              <div dangerouslySetInnerHTML={{ __html: comment.content }} />

              {loggedInUser?.id === comment.authorId && (
                <p className="text-end ">
                  <span
                    className="edit-p mx-2"
                    onClick={() =>
                      navigate(
                        `/post/${comment.postId}/comments/${comment.id}/edit`
                      )
                    }
                  >
                    Edit
                  </span>
                  <span
                    className="text-end delete-p"
                    onClick={() => setModal(true)}
                  >
                    Delete
                  </span>
                </p>
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={modal} toggle={() => setModal(false)}>
        <ModalHeader toggle={() => setModal(false)}>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this comment?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Yes
          </Button>
          <Button color="secondary" onClick={() => setModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CommentItem;
