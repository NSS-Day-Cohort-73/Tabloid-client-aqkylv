import { useEffect, useState } from "react";
import { getAllCategories } from "../../managers/categoryManager";
import { Button, Container, Form, Input } from "reactstrap";
import CategoryItem from "./CategoryItem";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  function getAndSetCategories() {
    getAllCategories().then(setCategories);
  }

  useEffect(() => {
    getAndSetCategories();
  }, []);

  return (
    <Container className="mx-auto">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
      <Form>
        <Input type="text" placeholder="Add a category" />
        <Button>Add</Button>
      </Form>
    </Container>
  );
}
export default CategoryList;
