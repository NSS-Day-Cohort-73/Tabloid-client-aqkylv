import { Button, Col, Row } from "reactstrap";

function CategoryItem({ category, index }) {
  return (
    <tr>
      <td style={{ color: "var(--grey)" }}>
        <Row>
          <Col className="my-auto text-start">{category.name}</Col>
          <Col className="text-end">
            <Button className="mx-1">Edit</Button>
            <Button className="mx-1 delete-btn">Delete</Button>
          </Col>
        </Row>
      </td>
    </tr>
  );
}

export default CategoryItem;
