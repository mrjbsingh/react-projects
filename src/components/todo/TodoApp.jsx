import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import "./TodoApp.css";
import AuthenticationService from "./AuthenticationService";

export class TodoApp extends Component {
  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/welcome/:name" element={<WelcomeComponent />} />
          <Route path="/todo" element={<ListTodoComponent />} />
          <Route path="*" element={<ErrorComponent />} />
        </Routes>
        <Footer />
        {/* <LoginComponent/>
        <WelcomeComponent/> */}
      </div>
    );
  }
}
class Header extends Component {

  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    console.log("lgoed in ?? "+ isUserLoggedIn);
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              My Todo App
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isUserLoggedIn && <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>}
                <li className="nav-item">
                  <a className="nav-link" href="/todo">
                    Todo
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>

              <button className="btn btn-primary">Sign in</button>
              <button className="btn btn-primary" onClick={AuthenticationService.logoutUser}>Logout</button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <span className="text-muted">All Right reserved to JBS</span>
        </footer>
      </div>
    );
  }
}
class Logout extends Component {
  render() {
    return (
      <div>
        <span>You Are Logout</span>
      </div>
    );
  }
}
class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      invalidCredential: false,
      loginSuccessfully: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkCredential = this.checkCredential.bind(this);
  }
  handleChange(event) {
    //console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  checkCredential() {
    console.log("i m in");
    console.log(this.state);
    
    if (this.state.username === "j" && this.state.password === "j") {
      console.log("correct");
      AuthenticationService.registerUser(this.state.username, this.state.password);
      this.setState({
        invalidCredential: false,
        loginSuccessfully: true,
      });
      
    } else {
      console.log("wrong");
      this.setState({
        invalidCredential: true,
        loginSuccessfully: false,
      });
    }
  }
  render() {
    return (
      <>
        <div>
          <h1>
            <DisplayCredentialMessage state={this.state} />
          </h1>
        </div>

        <div className="container">
          User Name
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          ></input>
          Password
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          ></input>
        </div>
        
        <div>
          <LoginButton
            state={this.state}
            checkCredential={this.checkCredential}
          />
        </div>
      </>
    );
  }
}

function Navigation (){
  let navigate = useNavigate();
  return navigate;
}

function LoginButton(props) {
  let navigate = useNavigate();

  function isSuccess() {
    console.log("is Success");
    props.checkCredential();
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={isSuccess}>
        Login
      </button>
    </div>
  );
}

function DisplayCredentialMessage(props) {
  let navigate = useNavigate();

  console.log("display obj");
  console.log(props.state);

  if (props.state.invalidCredential)
    return <div className="alert alert-warning">Invalid Credential </div>;
  else if (props.state.loginSuccessfully) {
    let url = "/welcome/" + props.state.username;
    console.log(url);
    //navigate(url);
    return null;
    //return <div>login Successfully </div>;
  } else return <div>Enter Your Credential </div>;
}

class WelcomeComponent extends Component {
  constructor(props){
    super(props);
    this.retrieveWelcomMessage = this.retrieveWelcomMessage.bind(this);
  }
  render() {
    return (
      <>
      <div className="container">
        <h1>
          {" "}
          Welcome <GetUsername />
        </h1>
        To check your todo List <Link to="/todo">go here</Link>
      </div>
      <div>
      <button onClick={this.retrieveWelcomMessage} className="btn btn-success">Api call</button>
      </div>
      </>
    );
  }
  retrieveWelcomMessage(){
    console.log("api call");
  }
}

function GetUsername() {
  const params = useParams();
  return <div>{params.name}</div>;
}
function ErrorComponent() {
  return <div>Error - please contact support</div>;
}

class ListTodoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          id: 1,
          description: "Learn dance",
          targetDate: "jan 19",
          isCompleted: false,
        },
        {
          id: 2,
          description: "Learn cook",
          targetDate: "jan 24",
          isCompleted: false,
        },
        {
          id: 3,
          description: "Learn React",
          targetDate: "jan 22",
          isCompleted: false,
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <h1>List Todo</h1>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Desciption</th>
                <th>Is completed ?</th>
                <th>Target Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr>
                  <th>{todo.id}</th>
                  <th>{todo.description}</th>
                  <th>{todo.isCompleted.toString()}</th>
                  <th>{todo.targetDate}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default TodoApp;
