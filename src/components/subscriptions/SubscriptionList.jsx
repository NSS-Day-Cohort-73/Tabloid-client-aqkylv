import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Badge,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import { deleteSubscription, getMySubscriptions } from "../../managers/subscriptionManager";

export default function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);
  
  useEffect(() => {
    getMySubscriptions().then(setSubscriptions);
  }, []);

  const handleUnsubscribe = (id) => {
    deleteSubscription(id)
      .then((response) => {
        if (response.ok) {
          setSubscriptions(subscriptions.filter(s => s.id !== id));
          window.alert("Unsubscribed successfully");
        } else {
          window.alert("Failed to unsubscribe");
        }
      });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  return (
    <Container>
      <h2 className="text-center fs-1">My Subscriptions</h2>
      {subscriptions.length === 0 ? (
         <Alert color="info" className="mt-4">
         <h4 className="text-center alert-heading">You are currently not subscribed to any authors.</h4>
         <hr />
         <p className="text-center mb-0">
           <Link to="/explore" className="alert-link">
             Explore Posts
           </Link>
           .
         </p>
       </Alert>
      ) : (
        subscriptions.map((s) => (
          <Card key={s.author.id} outline color="success" className="mb-3">
            <Row noGutters className="align-items-center">
              <Col md="3">
                <CardImg
                  top
                  src={s.author.imageLocation}
                  alt={`${s.author.firstName} ${s.author.lastName}`}
                  style={{
                    width: "80%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col md="6">
                <CardBody>
                  <CardTitle tag="h5">
                    <h2 className="text-center fs-1">
                      {s.author.firstName} {s.author.lastName}
                    </h2>
                  </CardTitle> 
                  <CardText className="text-center fs-4" >
                    
                  Subscribed since {formatDate(s.subscriptionStartDate)}
                  </CardText>
                </CardBody>
              </Col>
              <Col md="3" className="text-end px-3">
                
            <Button className="mx-1 delete-btn" size="lg" onClick={() => handleUnsubscribe(s.id)}>
              Unsubscribe
            </Button>
                
              </Col>
            </Row>
          </Card>
        ))
      )}
    </Container>
  );
}