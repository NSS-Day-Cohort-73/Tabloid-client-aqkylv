import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { getUserProfilePosts } from "../../managers/userProfileManager";

export default function UserProfilePosts() {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getUserProfilePosts(id).then(setPosts);
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  if (!posts.length) {
    return (
    <Container className="btn delete-btn text-center d-flex justify-content-center">
        This user currently has no posts to view
    </Container>)
  }

  return (
    <Container>
      {posts.map((p) => (
        <Card
          key={p.id}
          outline
          color="success"
          style={{ marginBottom: "10px" }}
        >
          <CardBody>
            <CardTitle tag="h5">
              <Link to={`/post/${p.id}`} style={{ textDecoration: 'none' }}>{p.title}</Link>
            </CardTitle>
            <CardText tag="div">
              Author: {p.author.fullName}
              <br />
              Published On: {formatDate(p.publishingDate)}
              <br />
              Category: {p.category.name}
            </CardText>
          </CardBody>
        </Card>
      ))}
    </Container>
  );
}