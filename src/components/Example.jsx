import { Col, Container, Row } from "reactstrap";

function Example() {
  return (
    <Container>
      <Row>
        <Col xs={2} className="bg-primary text-light">
          Test
        </Col>
        <Col>
          <Row>
            <Col xs={2} className="bg-warning text-dark">
              Test 2
            </Col>
            <Row>
              <Col xs={5} className="bg-danger text-light pb-5 rounded">
                Test 3
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
export default Example;
