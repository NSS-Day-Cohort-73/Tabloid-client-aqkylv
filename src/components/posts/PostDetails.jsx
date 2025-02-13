import { useEffect, useState } from "react";
import { Button, Card, Container } from "reactstrap";
import { useParams, Link  } from 'react-router-dom';
import { getById } from "../../managers/postManager";

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

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
            <h1 className="post-title text-center">{post.title.toUpperCase()}</h1>
            <div className="post-meta text-center">
              <span className="post-author">By: {post.author?.identityUser?.userName}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(post.publishingDate)}</span>
            </div>
            <div className="post-body">
              {post.content}
            </div>
          </div>
        </Card>
        <div className="button-container">
          <Button
            tag={Link}
            to={`/post/${id}/comments`} 
            className="button-color"
          >
            View Comments
          </Button>
          
          <Button
            tag={Link}
            to={`/post/${id}/comments/add`} 
            className="button-color"
          >
            Add A Comment
          </Button>
        </div>
      </Container>
    </div>
  );
}
