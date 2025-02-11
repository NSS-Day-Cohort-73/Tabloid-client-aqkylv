import { Col, Row } from "reactstrap";

function CategoryItem ({category}) {
    return (
      <Row >
        <Col className="text-center">{category.name}</Col>
      </Row>
    );
}
export default CategoryItem;