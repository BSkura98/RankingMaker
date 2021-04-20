import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, ListGroup } from "react-bootstrap";
import Item from "./components/Item";

function App() {
  return (
    <div className="App">
      <Container>
        <Card style={{ marginTop: "5rem" }}>
          <h1 className="text-center">Ranking</h1>
          <ListGroup>
            <Item
              position="1"
              name="Item 1"
              description="This is description. This is description."
            />
            <Item
              position="2"
              name="Item 2"
              description="This is description. This is description."
            />
            <Item
              position="3"
              name="Item 3"
              description="This is description. This is description."
            />
          </ListGroup>
        </Card>
      </Container>
    </div>
  );
}

export default App;
