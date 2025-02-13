import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import "./CommentStyles.css";
import { addComment } from "../../managers/commentManager";
import EditorMenuBar from "../EditorMenuBar";

function CreateComment({ loggedInUser }) {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState({
    authorId: loggedInUser?.id || "",
    postId: postId || "",
    subject: "",
    content: "",
  });

  useEffect(() => {
    setComment((prevComment) => ({
      ...prevComment,
      authorId: loggedInUser?.id || "",
      postId: postId || "",
    }));
  }, [postId, loggedInUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleEditorChange = ({ editor }) => {
    setComment((prevComment) => ({
      ...prevComment,
      content: editor.getHTML(), // Stores content as HTML
    }));
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Type your comment here...", // Placeholder text
        showOnlyWhenEditable: true, // Makes sure it disappears only when typing
      }),
    ],
    content: "<p></p>", // Ensures placeholder works (empty paragraph)
    autofocus: true, // Focuses editor automatically
    editable: true, // Ensures it's not read-only
    onUpdate: handleEditorChange,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasFalsyValue = Object.values(comment).some((value) => !value);
    if (hasFalsyValue) return;
    addComment(comment).then(() => {
      navigate(`/post/${postId}`);
    });
  };

  return (
    <Container className="mt-4">
      <h4>Post a Comment</h4>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="subject">Subject</Label>
          <Input
            type="text"
            id="subject"
            name="subject"
            placeholder="Enter subject"
            value={comment.subject}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Comment</Label>
          <div className="editor-container">
            <EditorMenuBar editor={editor} />
            <EditorContent editor={editor} />
          </div>
        </FormGroup>

        <Button color="primary" type="submit">
          Post Comment
        </Button>
      </Form>
    </Container>
  );
}

export default CreateComment;
