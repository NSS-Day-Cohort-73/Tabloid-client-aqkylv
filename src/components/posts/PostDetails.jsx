import { useEffect, useState } from "react";
import { Button, Card, Container } from "reactstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deletePost, getById } from "../../managers/postManager";
import ReactionBar from "../reactions/ReactionBar";
<<<<<<< HEAD
import PostTags from "./PostTags";
=======
import { PostSubscription } from "../../managers/subscriptionManager";
>>>>>>> ce2b59259cb3e7e5fec02c19b14d35b6867c2dc1

export default function PostDetails({ loggedInUser }) {
  const [post, setPost] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    getById(id).then(postData => {
      setPost(postData);
      setSubscription({
        authorId: postData.authorId,
        subscriberId: loggedInUser.id
      });
    });
  }, [id]);

  if (!post) return <Container>Loading...</Container>;
  
  const formatDate = dateString => {
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date.getFullYear()}`;
  };

  const deletePostFromDB = id => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(id).then(() => navigate("/explore"));
    }
  };

  const AddSubscription = subscription => {
    if (!subscription.authorId) {
      window.alert("Author not valid");
      return;
    }
    if (subscription.authorId === subscription.subscriberId) {
      window.alert("You can't subscribe to yourself silly!");
      return;
    }
    
    PostSubscription(subscription)
      .then(response => {
        if (response.ok) {
          window.alert("Subscribed successfully");
        } else {
          return response.json().then(data => {
            window.alert(data.error);
          });
        }
      })
  };

  return (
    <div className="content-container">
      <div className="full-width-image-background">
        <Container>
          <Card className="post-details-card">
            {post.headerImage && (
              <div className="header-image-container">
                <img src={post.headerImage} alt={post.title} className="header-image" />
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
<<<<<<< HEAD
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
=======
            
            <div className="post-body text-center" dangerouslySetInnerHTML={{ __html: post.content }} />
            
            {post.authorId === loggedInUser.id && (
              <Button onClick={() => deletePostFromDB(post.id)} className="float-end" color="danger">
                Delete Post
              </Button>
            )}
            
            <Button onClick={() => AddSubscription(subscription)} className="float-start" color="primary">
              Subscribe
>>>>>>> ce2b59259cb3e7e5fec02c19b14d35b6867c2dc1
            </Button>
          </div>
        </Card>
        
        <ReactionBar postId={post.id} loggedInUser={loggedInUser} />
<<<<<<< HEAD
        <div className="button-container d-flex justify-content-around my-3">
          <Button
            tag={Link}
            to={`/post/${id}/comments`}
            className="float-start"
            color="success"
          >
=======
        
        <div className="button-container">
          <Button tag={Link} to={`/post/${id}/comments`} className="float-start" color="success">
>>>>>>> ce2b59259cb3e7e5fec02c19b14d35b6867c2dc1
            View Comments
          </Button>
          <Button tag={Link} to={`/post/${id}/comments/add`} className="float-end" color="success">
            Add A Comment
          </Button>
        </div>
      </Container>
    </div>
  );
}
