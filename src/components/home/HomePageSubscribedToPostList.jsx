import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
  Spinner,
  Alert
} from "reactstrap";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../managers/postManager";
import { getProfilesForHomepage } from "../../managers/userProfileManager";
import PostItem from "../posts/PostItem";

export function MyHomePage({ loggedInUser }) {
  const [subscribedPosts, setSubscribedPosts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const posts = await getAllPosts(null, null, true, true);
        setSubscribedPosts(posts);
        const users = await getProfilesForHomepage();
        setAuthors(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  if (loading) {
    return (
      <Container className="fs-2 d-flex justify-content-center">
        <Spinner color="success">Loading...</Spinner>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h2 className="text-center fs-1">Latest Posts From Your Subscriptions</h2>
          {subscribedPosts.length === 0 ? (
            <Alert color="info" className="mt-4">
              <h4 className="alert-heading">No posts from your subscriptions yet!</h4>
              <hr />
              <p className="mb-0">
                <Link to="/explore" className="alert-link">
                  Explore Posts
                </Link>
                .
              </p>
            </Alert>
          ) : (
            subscribedPosts.map((p) => (
              <PostItem
                key={p.id}
                post={p}
                loggedInUser={loggedInUser}
              />
            ))
          )}
        </Col>

        <Col md={4}>
          <h3 className="text-center fs-2">Authors</h3>
          {authors.map((author) => (
            <Card key={author.id} className="mb-3">
              <CardBody className="d-flex align-items-center">
                <img
                  src={author.imageLocation}
                  alt={`${author.firstName} ${author.lastName}`}
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px" }}
                />
                <div>
                  <CardTitle tag="h5">
                    {author.firstName} {author.lastName}
                  </CardTitle>
                  <CardText>
                    User since {formatDate(author.createDateTime)}
                  </CardText>
                </div>
              </CardBody>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
