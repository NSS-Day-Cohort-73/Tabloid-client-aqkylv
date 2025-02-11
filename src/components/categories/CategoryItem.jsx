import { Button, Input } from "reactstrap";
import { deleteCategory, updateCategory } from "../../managers/categoryManager";
import { useState } from "react";

function CategoryItem({ category, getAndSetCategories }) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [editCategory, setEditCategory] = useState(category?.name);

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteCategory(category.id);
    await getAndSetCategories();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedCategory = { ...category, name: editCategory };
    await updateCategory(updatedCategory);
    await getAndSetCategories();
    setToggleEdit(false);
    setEditCategory(category.name);
  };

  const handleChange = (e) => {
    setEditCategory(e.target.value);
  };

  return (
    <tr>
      <td style={{ color: "var(--grey)" }}>
        <div className="d-flex justify-content-between align-items-center">
          {toggleEdit ? (
            <Input
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUpdate(e);
                }
              }}
              className="w-50"
              type="text"
              value={editCategory || ""}
              autoFocus
            />
          ) : (
            <span>{category.name}</span>
          )}
          <div>
            {toggleEdit ? (
              <Button onClick={handleUpdate} className="mx-1 save-btn">
                Save
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setToggleEdit(true);
                  setEditCategory(category?.name);
                }}
                className="mx-1"
              >
                Edit
              </Button>
            )}

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
