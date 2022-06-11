import { Container } from "react-bootstrap";
import "./App.css";
import { Converter } from "./components/Converter";
import Header from "./components/Header";

function App() {
  return (
    <div className="app">
      <Header />
      <Container fluid="sm">
        <Converter />
      </Container>
    </div>
  );
}

export default App;
