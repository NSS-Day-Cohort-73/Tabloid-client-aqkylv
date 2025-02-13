import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import "./CommentStyles.css";
import {
  addComment,
  getCommentById,
  updateComment,
} from "../../managers/commentManager";
import EditorMenuBar from "../EditorMenuBar";

function CreateComment({ loggedInUser }) {
  const { postId, commentId } = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState({
    authorId: loggedInUser?.id || "",
    postId: postId || "",
    subject: "",
    content: "",
  });

  // Initialize Tiptap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Type your comment here...",
        showOnlyWhenEditable: true,
      }),
    ],
    content: "<p></p>", // Must have something so the placeholder works
    autofocus: true,
    editable: true,
    onUpdate: ({ editor }) => {
      // Update our state ONLY as user types, no forced re-setting
      setComment((prevComment) => ({
        ...prevComment,
        content: editor.getHTML(),
      }));
    },
  });

  // Single useEffect to fetch or clear comment
  useEffect(() => {
    const fetchCommentData = async () => {
      // Editor might not be ready on first render
      if (!editor) return;

      if (commentId) {
        // If editing, fetch existing comment
        const fetchedComment = await getCommentById(commentId);
        setComment({
          authorId: loggedInUser?.id || "",
          postId: postId || "",
          subject: fetchedComment.subject || "",
          content: fetchedComment.content || "",
        });
        // Set editor content once after fetch
        editor.commands.setContent(fetchedComment.content || "");
      } else {
        // If creating a new one, clear everything
        setComment({
          authorId: loggedInUser?.id || "",
          postId: postId || "",
          subject: "",
          content: "",
        });
        editor.commands.clearContent();
      }
    };

    fetchCommentData();
  }, [editor, commentId, postId, loggedInUser]);

  // Handle form field changes (for subject, etc.)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Quick validation: check for falsy values
    const hasFalsyValue = Object.values(comment).some((value) => !value);
    if (hasFalsyValue) return;

    if (commentId) {
      // Update existing
      const updatedComment = { ...comment, id: commentId };
      updateComment(updatedComment)
        .then(() => navigate(`/post/${postId}`))
        .catch((err) => console.error(err));
    } else {
      // Create new
      addComment(comment)
        .then(() => navigate(`/post/${postId}`))
        .catch((err) => console.error(err));
    }
  };

  return (
    <Container className="mt-4">
      <h4>{commentId ? "Update Comment" : "Post a Comment"}</h4>
      {/* Use Form's onSubmit rather than button's onClick */}
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
          {commentId ? "Update Comment" : "Post Comment"}
        </Button>
      </Form>
    </Container>
  );
}

export default CreateComment;
