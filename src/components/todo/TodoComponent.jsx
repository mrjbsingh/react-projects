import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import react, { Component } from "react";
import { useHistory, useParams } from "react-router-dom";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";

class TodoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.params.id,
      description: "",
      targetDate: moment(new Date()).format("YYYY-MM-DD"),
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  validates(values) {
    let error = {}; //please don't forget to define object else error msg will not be shown
    if (!values.description) {
      error.description = "Please Enter a Description";
    } else if (values.description.length < 5) {
      error.description = "Please Enter atleast 5 character in Description";
    }

    if (!moment(values.targetDate).isValid()) {
      error.targetDate = "Enter a valid Date";
    }
    console.log(error);
    return error;
  }

  onSubmit(values) {
    
    let username = AuthenticationService.getLoggedInUser();
    
    let todo = {
      id: this.state.id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
    };
    if (this.state == -1) {
      TodoDataService.addNewTodo(username, todo).then((response) => {
        console.log("added todo");
        this.props.navigate(`/todos`);
      });
    } 
    else {
      TodoDataService.executeUpdateTodo(username, this.state.id, todo).then((response) => {
        console.log("update todo");
        this.props.navigate(`/todos`);
      });
    }
  }

  componentDidMount() {
    let username = AuthenticationService.getLoggedInUser();
    if (this.state.id == -1) return;
    else this.loadTodoById(username, this.state.id);
  }
  loadTodoById(username, id) {
    TodoDataService.executeTodoById(username, id).then((response) => {
      console.log("response from todo by id");
      console.log(response.data);
      this.setState({
        description: response.data.description,
        targetDate: moment(response.data.targetDate).format("YYYY-MM-DD"),
      });
    });
  }

  render() {
    let description = this.state.description;
    let targetDate = this.state.targetDate;
    return (
      <>
        {" "}
        <h1>Edit Todo</h1>
        <div className="container">
          <Formik
            initialValues={{ description, targetDate }}
            onSubmit={this.onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            validate={this.validates}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                ></ErrorMessage>
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                ></ErrorMessage>
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  ></Field>
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  ></Field>
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div>Todo Component for id - {this.state.id}</div>
      </>
    );
  }
}
export default TodoComponent;
