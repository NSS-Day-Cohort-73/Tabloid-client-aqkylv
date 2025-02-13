import { Button, Input } from "reactstrap";
import { deleteTag, updateTag } from "../../managers/tagManager";
import { useState } from "react";

function TagItem({ tag, getAndSetTags }) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [editTag, setEditTag] = useState(tag?.name);

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteTag(tag.id);
    await getAndSetTags();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedTag = { ...tag, name: editTag };
    await updateTag(updatedTag);
    await getAndSetTags();
    setToggleEdit(false);
    setEditTag(tag.name);
  };

  const handleChange = (e) => {
    setEditTag(e.target.value);
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
              value={editTag || ""}
              autoFocus
            />
          ) : (
            <span>{tag.name}</span>
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
                  setEditTag(tag?.name);
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

export default TagItem;
