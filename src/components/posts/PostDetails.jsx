import { useEffect, useState } from "react";
import { Badge, Button, Card, Container, Spinner } from "reactstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deletePost, getById } from "../../managers/postManager";
import ReactionBar from "../reactions/ReactionBar";
import PostTags from "./PostTags";
import { deleteSubscription, PostSubscription, checkSubscription } from "../../managers/subscriptionManager";

export default function PostDetails({ loggedInUser }) {
  const [post, setPost] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getById(id).then((postData) => {
      setPost(postData);
      checkSubscription(postData.authorId, loggedInUser.id)
        .then(({ isSubscribed, subscriptionId }) => {
          setIsSubscribed(isSubscribed);
          setSubscriptionId(subscriptionId || null);
        });
    });
  }, [id]);

  if (!post) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const deletePostFromDB = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(id).then(() => navigate("/explore"));
    }
  };

  const handleSubscribe = () => {
    if (post.authorId === loggedInUser.id) {
      window.alert("You can't subscribe to yourself!");
      return;
    }

    const subscription = {
      authorId: post.authorId,
      subscriberId: loggedInUser.id
    };

    PostSubscription(subscription)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setIsSubscribed(true);
        setSubscriptionId(data.id);
        window.alert("Subscribed successfully");
      })
      .catch((response) => {
        response.json().then((data) => {
          window.alert(data.error);
        });
      });
  };

  const handleUnsubscribe = () => {
    if (!subscriptionId) {
      window.alert("No subscription found");
      return;
    }

    deleteSubscription(subscriptionId)
      .then((response) => {
        if (response.ok) {
          setIsSubscribed(false);
          setSubscriptionId(null);
          window.alert("Unsubscribed successfully");
        } else {
          window.alert("Failed to unsubscribe");
        }
      });
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
            <div className="post-meta text-center mb-3">
              <span className="mx-2">
                By: {post.author?.identityUser?.userName}
                {post.authorId !== loggedInUser.id && (
                  <Badge
                    onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
                    className="ms-1 btn"
                    color="primary"
                  >
                    {isSubscribed ? "Unsubscribe" : "Subscribe"}
                  </Badge>
                )}
              </span>
              <span>{formatDate(post.publishingDate)}</span>
              <span className="ms-2">
                Read time: {post.readTime}{" "}
                {post.readTime > 1 ? "minutes" : "minute"}
              </span>
            </div>

            <PostTags post={post} />
            <div
              className="post-body text-start"
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
                color="success"
              >
                Add A Comment
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}