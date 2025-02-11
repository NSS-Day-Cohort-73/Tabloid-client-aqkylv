import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Container } from "reactstrap";
import { getAllPosts } from "../../managers/postManager";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    
    function getAndSetPosts() {
        getAllPosts().then(setPosts);   
    }
    
    useEffect(() => {
        getAndSetPosts();
    }, []);

    return (
        <Container>
            <h4>PostLand</h4>
            
            {posts.map((p) => (
                <Card 
                    key={p.id} 
                    outline 
                    color="success" 
                    style={{ marginBottom: "10px" }}
                >
                    <CardBody>
                        <CardTitle tag="h5">{p.title}</CardTitle>
                        <CardText tag="div">
                            Author: {p.author.fullName}
                            <br />
                            Category: {p.category.name}
                        </CardText>
                    </CardBody>
                </Card>
            ))}
        </Container>
    );
}