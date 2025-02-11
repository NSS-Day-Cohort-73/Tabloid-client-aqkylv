import { Button } from "reactstrap";
import { deleteCategory } from "../../managers/categoryManager";

function CategoryItem({ category, getAndSetCategories }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteCategory(category.id);
    await getAndSetCategories();
  };

  return (
    <tr>
      <td style={{ color: "var(--grey)" }}>
        <div className="d-flex justify-content-between align-items-center">
          <span>{category.name}</span>
          <div>
            <Button className="mx-1">Edit</Button>
            <Button className="mx-1 delete-btn" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default CategoryItem;
