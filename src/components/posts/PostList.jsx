import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Container, Button } from "reactstrap";
import { getAllPosts } from "../../managers/postManager";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    
    function getAndSetPosts() {
        getAllPosts().then(setPosts);   
    }
    
    useEffect(() => {
        getAndSetPosts();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };
    const handleDelete = (id) => {
        deleteChore(id).then(() => {
          getAllChores();
        });
      };

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
                            Published On: {formatDate(p.publishingDate)}
                            <br />
                            Category: {p.category.name}
                        </CardText>
                    </CardBody>
                </Card>
                
            ))}
            <Button href="/createpost"> NEW POST </Button>
        </Container>
    );
}