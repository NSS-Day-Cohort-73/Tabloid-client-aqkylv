import { Button, ButtonGroup } from "reactstrap";

function EditorMenuBar({ editor }) {
  if (!editor) return null; // Ensure editor exists before rendering

  return (
    <div className="editor-toolbar">
      {/* Bold Button */}
      <ButtonGroup>
        <Button
          color={editor.isActive("bold") ? "primary" : "secondary"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </Button>

        {/* Italic Button */}
        <Button
          color={editor.isActive("italic") ? "primary" : "secondary"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <em>I</em>
        </Button>

        {/* Underline (Tiptap doesn’t support natively, so we use a mark extension) */}
        <Button
          color={editor.isActive("underline") ? "primary" : "secondary"}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <u>U</u>
        </Button>
      </ButtonGroup>

      {/* List Buttons */}
      <ButtonGroup>
        <Button
          color={editor.isActive("bulletList") ? "primary" : "secondary"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </Button>

        <Button
          color={editor.isActive("orderedList") ? "primary" : "secondary"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </Button>
      </ButtonGroup>

      {/* Undo / Redo */}
      <ButtonGroup>
        <Button
          color="secondary"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          ⬅ Undo
        </Button>

        <Button
          color="secondary"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo ➡
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default EditorMenuBar;
