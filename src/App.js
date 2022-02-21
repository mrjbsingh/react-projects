import logo from "./logo.svg";
import "./App.css";
import TodoApp from "./components/todo/TodoApp";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <TodoApp/>
      </Router>
    </div>
  );
}

export default App;
