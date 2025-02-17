import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Input, Label } from "reactstrap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { getAllCategories } from "../../managers/categoryManager";
import { createPost } from "../../managers/postManager";
import ImageUploader from "../imageUploader";
import EditorMenuBar from "../EditorMenuBar";

export default function CreateAPost({ loggedInUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    categoryId: "",
    content: "",
    authorId: loggedInUser?.id,
    headerImage: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your post here...",
        showOnlyWhenEditable: true,
      }),
    ],
    content: "<p></p>",
    autofocus: true,
    editable: true,
    onUpdate: ({ editor }) => {
      setFormData((prevState) => ({
        ...prevState,
        content: editor.getHTML(),
      }));
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleHeaderImage = (url) => {
    setFormData((prevState) => ({
      ...prevState,
      headerImage: url,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createPost(formData)
      .then(() => {
        alert("Posted!");
        navigate("/explore");
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  return (
    <Container className="post-form">
      <h2 className="text-center">Create A New Post</h2>
      <Form onSubmit={handleSubmit}>
        <div className="form-field">
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-field">
          <Label>Sub-Title</Label>
          <Input
            type="text"
            name="subTitle"
            value={formData.subTitle}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-field">
          <Label>Category</Label>
          <Input
            type="select"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Input>
        </div>

        <div className="form-field">
          <Label>Publishing Date</Label>
          <Input
            className="bg-light"
            type="text"
            value={new Date().toLocaleDateString()}
            readOnly
          />
        </div>

        <div className="form-field">
          <Label>Header Image</Label>
          <ImageUploader type="header" setImageURL={handleHeaderImage} />
        </div>

        <div className="form-field">
          <Label>Body</Label>
          <div className="editor-container">
            <EditorMenuBar editor={editor} />
            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="button-container mt-2 text-end">
          <Button color="success" type="submit">
            Save Post
          </Button>
        </div>
      </Form>
    </Container>
  );
}
