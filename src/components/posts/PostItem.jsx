import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  CardImg,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { approvePost, unapprovePost } from "../../managers/postManager";

const PostItem = ({ post, loggedInUser, onRefresh }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleApprove = async () => {
    await approvePost(post.id);
    onRefresh();
  };

  const handleUnapprove = async () => {
    await unapprovePost(post.id);
    onRefresh();
  };

  return (
    <Card outline color="success" style={{ marginBottom: "10px" }}>
      <Row gutter={0}>
        {/* Left Column (Image) */}
        <Col md="3">
          <CardImg
            top
            src={post.headerImage || "https://picsum.photos/200/300?random=1"}
            alt={post.title}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
        </Col>

        {/* Middle Column (Title + Subtitle) */}
        <Col md="6">
          <CardBody>
            <CardTitle tag="h5">
              <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
                {post.title}
              </Link>
            </CardTitle>
            <CardText>{post.subTitle}</CardText>
          </CardBody>
        </Col>

        {/* Right Column (Post metadata) */}
        <Col md="3" className="d-flex flex-column justify-content-center p-3">
          {loggedInUser.roles.includes("Admin") ? (
            post.isApproved ? (
              <CardText>
                <Button outline color="danger" onClick={handleUnapprove}>
                  Un-Approve
                </Button>
              </CardText>
            ) : (
              <CardText>
                <Button outline color="success" onClick={handleApprove}>
                  Approve
                </Button>
              </CardText>
            )
          ) : null}
          <CardText>
            <strong>Author:</strong> {post.author.fullName}
          </CardText>
          <CardText>
            <strong>Published On:</strong> {formatDate(post.publishingDate)}
          </CardText>
          <CardText>
            <strong>Category:</strong> {post.category.name}
          </CardText>
          <CardText>
            <strong>Read Time:</strong> {post.readTime}{" "}
            {post.readTime > 1 ? "minutes" : "minute"}
          </CardText>
        </Col>
      </Row>
    </Card>
  );
};

export default PostItem;
