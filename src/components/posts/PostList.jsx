import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { getAllPosts } from "../../managers/postManager";

export default function PostList({ loggedInUser }) {
    const [posts, setPosts] = useState([]);
    
        function getAndSetPosts() {
          getAllPosts().then(setPosts);   
        }
    
        useEffect(() => {
            getAndSetPosts();
        }, []);

  return (
    <>
      <h4>PostLand</h4>
      
      {posts.map((p) => (
        <Card outline color="sucsess" key={p.id} style={{ marginBottom: "4px" }}>
          <CardBody>
            <CardTitle tag="h5">{p.title}</CardTitle>
            <CardText>
              <div>Author: {p.author.fullName}</div>
              <div>Category: {p.category.name}</div>
            </CardText>
          </CardBody>
        </Card>
      ))}
    </>
  );
}