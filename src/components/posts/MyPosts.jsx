import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Button
} from "reactstrap";
import { getById, getMyPosts } from "../../managers/postManager";
import { Link, useParams } from "react-router-dom";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);

  const { id } = useParams();

  function getAndSetPosts() {
    getMyPosts().then(setPosts);
  }

  


  useEffect(() => {
    getAndSetPosts();
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
            <Link to={`/createpost/${p.id}`} className="btn btn-primary">Edit Post</Link>
          </CardBody>
        </Card>
      ))}
      
    </Container>
  )
}