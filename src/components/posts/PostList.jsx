import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Button,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { getAllPosts } from "../../managers/postManager";
import { Link, useParams } from "react-router-dom";
import { getAllCategories } from "../../managers/categoryManager";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();

  function getAndSetPosts() {
    getAllPosts().then(setPosts);
  }

  function getAndSetCategories() {
    getAllCategories().then(setCategories);
  }
  useEffect(() => {
    getAndSetPosts();
  }, []);

  useEffect(() => {
    getAndSetCategories();
  }, []);

  function handleCategorySelect(e) {
    const categoryId = e.target.value;
    if (categoryId === "") {
      getAllPosts().then(setPosts);
    } else {
      getAllPosts(categoryId).then(setPosts);
    }
  }

  if (!posts.length) {
    return (
      <Container className="fs-2 d-flex justify-content-center">
        No Posts To See Here
      </Container>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs="12" className="d-flex justify-content-end">
            <div>
              <Label>Filter By Category</Label>
              <Input
                type="select"
                name="categoryId"
                onChange={handleCategorySelect}
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Input>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="mt-5">
        {posts.map((p) => (
          <Card
            key={p.id}
            outline
            color="success"
            style={{ marginBottom: "10px" }}
          >
            <CardBody>
              <CardTitle tag="h5">
                <Link to={`/post/${p.id}`} style={{ textDecoration: "none" }}>
                  {p.title}
                </Link>
              </CardTitle>
              <CardText tag="div">
                Author: {p.author.fullName}
                <br />
                Published On: {formatDate(p.publishingDate)}
                <br />
                Category: {p.category.name}
                <br />
                Read Time: {p.readTime} {p.readTime > 1 ? "minutes" : "minute"}
              </CardText>
            </CardBody>
          </Card>
        ))}
        <Button href="/createpost"> NEW POST </Button>
      </Container>
    </>
  );
}
