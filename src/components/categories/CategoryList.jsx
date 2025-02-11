import { useEffect, useState } from "react";
import { getAllCategories } from "../../managers/categoryManager";
import { Container } from "reactstrap";
import CategoryItem from "./CategoryItem";

function CategoryList () {

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
          <CategoryItem
            key={category.id}
            category={category}
          />
        ))}
      </Container>
    );
}
export default CategoryList;