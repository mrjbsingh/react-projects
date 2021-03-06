import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import "./TodoApp.css";
import AuthenticationService from "./AuthenticationService";
import HelloWorldService from "../../api/todo/HelloWorldService";
import ListTodoComponent from "./ListTodoComponent"
import TodoComponent from "./TodoComponent";
import withNavigation from "./WithNavigation";
import withParams from "./WithParams";

export class TodoApp extends Component {
  render() {
    const LoginComponentWithNavigation = withNavigation(LoginComponent);
    const ListTodosComponentWithNavigation = withNavigation(ListTodoComponent);
    const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent));
    return (
      <div className="TodoApp">
        <Header />
        <Routes>
          <Route path="/" element={<LoginComponentWithNavigation />} />
          <Route path="/login" element={<LoginComponentWithNavigation />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/welcome/:name" element={<WelcomeComponent />} />
          <Route path="/todo/:id" element={<TodoComponentWithParamsAndNavigation />} />
          <Route path="/todos" element={<ListTodosComponentWithNavigation />} />
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
                  <a className="nav-link" href="/todos">
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
    
    if (this.state.username === "jay" && this.state.password === "jay") {
      console.log("correct");
      AuthenticationService.registerUser(this.state.username, this.state.password);
      this.setState({
        invalidCredential: false,
        loginSuccessfully: true,
      });
      this.props.navigate(`/welcome/`+this.state.username);
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
    this.state ={
      welcomeMsg: '',
      hardcodedName: 'jayen'
    }
    this.retrieveWelcomMessage = this.retrieveWelcomMessage.bind(this);
    this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  render() {
    return (
      <>
      <div className="container">
        <h1>
          {" "}
          Welcome <GetUsername />
        </h1>
        To check your todo List <Link to="/todos">go here</Link>
      </div>
      <div>
      <button onClick={this.retrieveWelcomMessage} className="btn btn-success">Api call</button>
      </div>
      <div className="container">
      {this.state.welcomeMsg}
      </div>
      </>
    );
  }
  retrieveWelcomMessage(){
    console.log("api call");
    // HelloWorldService.executHelloWorldService()
    // .then(response => this.handleSuccessfulResponse(response))
    //console.log(this.state.hardcodedName);
    HelloWorldService.executHelloWorldPathVariableService(this.state.hardcodedName)
    .then(response => this.handleSuccessfulResponse(response))
    .catch(error => this.handleError(error))


  }
  handleSuccessfulResponse(response){
    console.log("response");
    this.setState({welcomeMsg: response.data.message})
  }
  handleError(error){
    //console.log(error);
    let errorMessage='';
    if(error.message)
      errorMessage += error.message;
    if(error.response && error.response.data){
      errorMessage += error.response.data.message;
    }
    this.setState({welcomeMsg: errorMessage})
  }
}

function GetUsername() {
  const params = useParams();
  return <div>{params.name}</div>;
}
function ErrorComponent() {
  return <div>Error - please contact support</div>;
}


export default TodoApp;
