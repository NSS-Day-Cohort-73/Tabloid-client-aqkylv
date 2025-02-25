import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Button,
  Alert
} from "reactstrap";
import { getMyPosts } from "../../managers/postManager";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";

export default function MyPosts({ loggedInUser }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getMyPosts().then(setPosts);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <Container>
       <h2 className="text-center fs-1">My Posts</h2>
      {posts.length === 0 ? (
        <Alert color="info" className="mt-4">
        <h4 className="alert-heading">  You don't have any self-published posts to view. Click here to create a new post!</h4>
        <hr />
        <p className="mb-0">
          <Link to="/createpost" className="alert-link">
            Create a new Post!
            </Link>
            </p>
        </Alert>
      ) : (
        posts.map((p) => (
          <PostItem key={p.id} post={p} loggedInUser={loggedInUser} onRefresh={() => getMyPosts().then(setPosts)} />
        ))
      )}
    </Container>
  );
}
