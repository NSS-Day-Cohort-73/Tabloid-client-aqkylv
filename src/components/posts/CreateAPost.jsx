import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Label } from "reactstrap";
import { getAllCategories } from "../../managers/categoryManager";
import { createPost } from "../../managers/postManager";

import ImageUploader from "../imageUploader";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // A function passed to ImageUploader so it can give us the URL
  const handleHeaderImage = (url) => {
    setFormData((prevState) => ({
      ...prevState,
      headerImage: url,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Now we have headerImage in our formData when we create the post
    createPost(formData)
      .then(() => {
        alert("Posted!");
        navigate("/explore");
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  return (
    <div className="post-form">
      <h2>Create A New Post</h2>
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
          <Input type="text" value={new Date().toLocaleDateString()} readOnly />
        </div>

        <div className="form-field">
          <Label>Header Image</Label>
          <ImageUploader type="header" setImageURL={handleHeaderImage} />
          {/* This replaces <Input type="file" name="headerImage" /> */}
        </div>

        <div className="form-field">
          <Label>Body</Label>
          <Input
            type="textarea"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="button-container">
          <Button color="success" type="submit">
            Save Post
          </Button>
        </div>
      </Form>
    </div>
  );
}
