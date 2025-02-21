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

export default function PostList({ loggedInUser }) {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [showApproved, setShowApproved] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

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
    if (selectedCategory || selectedTag) {
      getAllPosts(selectedCategory, selectedTag, showApproved).then(setPosts);
    } else {
      getAllPosts(null, null, showApproved).then(setPosts);
    }
  }, [selectedCategory, selectedTag, showApproved, refreshTrigger]);

  function handleCategorySelect(e) {
    const categoryId = e.target.value;
    setSelectedCategory((prev) => categoryId);
  }

  function handleTagSelect(e) {
    const tagId = e.target.value;
    setSelectedTag((prev) => tagId);
  }

  const toggleShowApproved = () => {
    setShowApproved((prev) => !prev);
  };

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => !prev);
  };

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
                <Col>
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
                {loggedInUser.roles.includes("Admin") && showApproved ? (
                  <Col className="align-self-end" sm={2}>
                    <Button className="w-100" onClick={toggleShowApproved}>
                      Show Un-Approved
                    </Button>
                  </Col>
                ) : loggedInUser.roles.includes("Admin") && !showApproved ? (
                  <Col className="align-self-end" sm={2}>
                    <Button className="w-100" onClick={toggleShowApproved}>
                      Show Approved
                    </Button>
                  </Col>
                ) : null}
              </Row>
              {posts.length ? (
                posts.map((p) => (
                  <PostItem
                    key={p.id}
                    post={p}
                    loggedInUser={loggedInUser}
                    onRefresh={triggerRefresh}
                  />
                ))
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
