import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

function CommentItem({ loggedInUser, comment, getAndSet }) {
  const [commentDate, setCommentDate] = useState("");

  //Function to format ISO date to custom format
  function formatISOToCustom(isoString) {
    const date = new Date(isoString);

    // Get individual components
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Format minutes properly
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${month}/${day}/${year} at ${hours}:${formattedMinutes} ${ampm}`;
  }

  useEffect(() => {
    const date = formatISOToCustom(comment.creationDate);
    setCommentDate(date);
  }, [comment.creationDate]);

  return (
    <Row className="my-2 bg-light border ">
      <Col xs={1}>
        <img
          src={comment.author.profilePicture || "https://picsum.photos/75"}
          className="rounded-circle p-1"
          alt={`Profile picture for ${comment.author.fullName}`}
        />
      </Col>
      <Col className="border-start ">
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
          {/* render in dangerouslySetInnerHTML to render HTML content */}
            <div dangerouslySetInnerHTML={{ __html: comment.content }} /> 
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
export default CommentItem;
