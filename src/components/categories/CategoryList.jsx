import { useEffect, useState } from "react";
import { addCategory, getAllCategories } from "../../managers/categoryManager";
import { Button, Col, Container, Form, Input, Row, Table } from "reactstrap";
import CategoryItem from "./CategoryItem";
import "./CategoryStyle.css";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  async function getAndSetCategories() {
    const data = await getAllCategories();
    setCategories(data);
  }

  useEffect(() => {
    getAndSetCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const trimmedCategory = newCategory.trim();
    if (!trimmedCategory) return;

    const newCategoryObj = { name: trimmedCategory };
    await addCategory(newCategoryObj);
    await getAndSetCategories();
    setNewCategory(""); // Clear input
  };

  return (
    <Container className="mx-auto mt-4">
      {/* Categories Table */}
      <Table hover striped className="text-center w-50 mx-auto border">
        <thead>
          <tr>
            <th>
              <h2>Category Name</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <CategoryItem
              key={category.id}
              getAndSetCategories={getAndSetCategories}
              category={category}
              index={index}
            />
          ))}
        </tbody>
      </Table>

      {/* Form for Adding Categories */}
      <Form>
        <Row className="justify-content-center">
          <Col xs={4}>
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              type="text"
              placeholder="Add a category"
            />
          </Col>
          <Col xs="auto">
            <Button onClick={handleAddCategory} className="save-btn">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CategoryList;
