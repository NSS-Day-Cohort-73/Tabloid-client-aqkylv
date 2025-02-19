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
  Spinner,
} from "reactstrap";
import { getAllPosts } from "../../managers/postManager";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../managers/categoryManager";
import { getAllTags } from "../../managers/tagManager";
import PostItem from "./PostItem";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  function getAndSetPosts() {
    getAllPosts().then(setPosts);
  }

  function getAndSetCategories() {
    getAllCategories().then(setCategories);
  }

  function getAndSetTags() {
    getAllTags().then(setTags);
  }
  useEffect(() => {
    getAndSetPosts();
  }, []);

  useEffect(() => {
    getAndSetCategories();
    getAndSetTags();
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedTag) {
      getAllPosts(selectedCategory, selectedTag).then(setPosts);
    } else if (selectedCategory) {
      getAllPosts(selectedCategory).then(setPosts);
    } else if (selectedTag) {
      getAllPosts(null, selectedTag).then(setPosts);
    } else {
      getAndSetPosts();
    }
  }, [selectedCategory, selectedTag]);

  function handleCategorySelect(e) {
    const categoryId = e.target.value;
    setSelectedCategory((prev) => categoryId);
  }

  function handleTagSelect(e) {
    const tagId = e.target.value;
    setSelectedTag((prev) => tagId);
  }

  if (!posts) {
    return (
      <Container className="fs-2 d-flex justify-content-center">
        <Spinner color="success">Loading...</Spinner>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2 className="text-center fs-1">Post List</h2>

          <Row>
            <Col md={3} className="mt-5 me-1">
              <h3>Search by Tag</h3>
              <Row className="p-2">
                <Button
                  value={null}
                  className="delete-btn"
                  onClick={handleTagSelect}
                >
                  No Tag
                </Button>
              </Row>
              {tags.map((t) => (
                <Row key={t.id} className="p-2">
                  <Button
                    value={t.id}
                    className="save-btn"
                    onClick={handleTagSelect}
                  >
                    #{t.name}
                  </Button>
                </Row>
              ))}
            </Col>
            <Col md={8} className="mt-5">
              <Row className="mb-4">
                <Col md={12}>
                  <Label>
                    <h3>Filter By Category</h3>
                  </Label>
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
                </Col>
              </Row>
              {posts.length ? (
                posts.map((p) => <PostItem key={p.id} post={p} />)
              ) : (
                <h2>No Posts Found</h2>
              )}
              <Row>
                <Button className="save-btn mb-5" href="/createpost">
                  {" "}
                  NEW POST{" "}
                </Button>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
