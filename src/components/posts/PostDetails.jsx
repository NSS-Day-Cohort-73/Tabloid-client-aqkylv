import { useEffect, useState } from "react";
import { Button, Card, Container } from "reactstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deletePost, getById } from "../../managers/postManager";
import ReactionBar from "../reactions/ReactionBar";
import PostTags from "./PostTags";

export default function PostDetails({ loggedInUser }) {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getById(id).then(setPost);
  }, [id]);

  if (!post) {
    return <Container>Loading...</Container>;
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const deletePostFromDB = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(id).then(() => {
        navigate("/explore");
      });
    }
  };

  return (
    <div className="content-container">
      <div className="full-width-image-background">
        <Container>
          <Card className="post-details-card">
            {post.headerImage && (
              <div className="header-image-container">
                <img
                  src={post.headerImage}
                  alt={post.title}
                  className="header-image"
                />
              </div>
            )}
          </Card>
        </Container>
      </div>

      <Container>
        <Card className="post-details-card">
          <div className="post-content">
            <h1 className="post-title text-center">
              {post.title.toUpperCase()}
            </h1>
            <div className="post-meta text-center">
              <span className="post-author">
                By: {post.author?.identityUser?.userName}
              </span>
              <span className="mx-2">•</span>
              <span>{formatDate(post.publishingDate)}</span>
            </div>
            <PostTags post={post} />
            <div
              className="post-body text-center"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
             {post.authorId === loggedInUser.id && (
            <Button
              onClick={() => deletePostFromDB(post.id)}
               className="float-end"
               color="danger"
            >
              Delete Post
            </Button>
          )}
          </div>
        </Card>
        <ReactionBar postId={post.id} loggedInUser={loggedInUser} />
        <div className="button-container d-flex justify-content-around my-3">
          <Button
            tag={Link}
            to={`/post/${id}/comments`}
            className="float-start"
            color="success"
          >
            View Comments
          </Button>

          <Button
            tag={Link}
            to={`/post/${id}/comments/add`}
            className="float-end"
            color="primary"
          >
            Add A Comment
          </Button>

         
        </div>
      </Container>
    </div>
  );
}
