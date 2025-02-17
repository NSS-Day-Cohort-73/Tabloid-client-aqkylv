import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, Input, Label } from "reactstrap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { getAllCategories } from "../../managers/categoryManager";
import { getByIdToBeEdited, updatePost } from "../../managers/postManager";
import ImageUploader from "../imageUploader";
import EditorMenuBar from "../EditorMenuBar";

export default function EditAPost() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [categories, setCategories] = useState([]);

    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({ placeholder: "Write your post here..." })],
        content: ""
    });

    useEffect(() => {
        getByIdToBeEdited(id).then(fetchedPost => {
            setPost(fetchedPost);
            if (editor) editor.commands.setContent(fetchedPost.content);
        });
        getAllCategories().then(setCategories);
    }, [id, editor]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            title: post.title,
            subTitle: post.subTitle,
            categoryId: post.category.id,
            content: editor.getHTML(),
          headerImage: post.headerImage,
          authorId: post.authorId
        };

        updatePost(id, postData) 
        .then(() => {
            navigate(`/post/${post.id}`);
        });
    };

    return (
        <Container>
            <h2>Edit Post</h2>
            <Form onSubmit={handleSubmit}>
                <div>
                    <Label>Title</Label>
                    <Input
                        value={post?.title || ""}
                        onChange={e => setPost({...post, title: e.target.value})}
                    />
                </div>

                <div>
                    <Label>Sub-Title</Label>
                    <Input
                        value={post?.subTitle || ""}
                        onChange={e => setPost({...post, subTitle: e.target.value})}
                    />
                </div>

                <div>
                    <Label>Category</Label>
                    <Input 
                        type="select" 
                        value={post?.category?.id || ""}
                        onChange={e => setPost({...post, category: { id: e.target.value }})}
                    >
                        <option value="">Select a category</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </Input>
                </div>

                <div>
                    <Label>Header Image</Label>
                    <ImageUploader 
                        type="header"
                        value={post?.headerImage}
                        setImageURL={url => setPost({...post, headerImage: url})}
                    />
                    {post?.headerImage && <img src={post.headerImage} alt="Header" style={{maxWidth: "200px"}}/>}
                </div>

                <div>
                    <Label>Body</Label>
                    <EditorMenuBar editor={editor} />
                    <EditorContent editor={editor} />
                </div>

                <div>
                    <Button color="secondary" onClick={() => navigate(`/my-posts`)}>Cancel</Button>
                    <Button color="primary" type="submit">Save Changes</Button>
                </div>
            </Form>
        </Container>
    );
}