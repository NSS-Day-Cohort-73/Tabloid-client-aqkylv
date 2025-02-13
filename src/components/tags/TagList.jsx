import { useEffect, useState } from "react";
import { addTag, getAllTags } from "../../managers/tagManager";
import { Button, Col, Container, Form, Input, Row, Table } from "reactstrap";
import TagItem from "./TagItem";

function TagList({ loggedInUser }) {
  if (!loggedInUser.isAdmin)
    return <h1 className="text-center">Unauthorized</h1>;
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  async function getAndSetTags() {
    const data = await getAllTags();
    setTags(data);
  }

  useEffect(() => {
    getAndSetTags();
  }, []);

  const handleAddTag = async (e) => {
    e.preventDefault();
    const trimmedTag = newTag.trim();
    if (!trimmedTag) return;

    const newTagObj = { name: trimmedTag };
    await addTag(newTagObj);
    await getAndSetTags();
    setNewTag(""); // Clear input
  };

  return (
    <Container className="mx-auto mt-4">
      {/* Tags Table */}
      <Table hover striped className="text-center w-50 mx-auto border">
        <thead>
          <tr>
            <th>
              <h2>Tag Name</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag, index) => (
            <TagItem
              key={tag.id}
              getAndSetTags={getAndSetTags}
              tag={tag}
              index={index}
            />
          ))}
        </tbody>
      </Table>

      {/* Form for Adding Tags */}
      <Form>
        <Row className="justify-content-center">
          <Col xs={4}>
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              type="text"
              placeholder="Add a tag"
            />
          </Col>
          <Col xs="auto">
            <Button onClick={handleAddTag} className="save-btn">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default TagList;
