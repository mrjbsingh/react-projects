import react, {Component} from "react";
import { useHistory, useParams, useNavigate } from 'react-router-dom'
import { withRouter } from "react-router";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";
import TodoComponent from "./TodoComponent"
import moment from "moment";

class ListTodoComponent extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        todos: [
          // {
          //   id: 1,
          //   description: "Learn dance",
          //   targetDate: "jan 19",
          //   isCompleted: false,
          // },
          // {
          //   id: 2,
          //   description: "Learn cook",
          //   targetDate: "jan 24",
          //   isCompleted: false,
          // },
          // {
          //   id: 3,
          //   description: "Learn React",
          //   targetDate: "jan 22",
          //   isCompleted: false,
          // },
        ],
        message: null
      };
      this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
      this.updateTodoClicked = this.updateTodoClicked.bind(this);
      this.addTodoClicked = this.addTodoClicked.bind(this);
    }
    render() {
      return (
        <div>
          <h1>List Todo</h1>
          {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Desciption</th>
                  <th>Is completed ?</th>
                  <th>Target Date</th>
                  <th>Update Todo</th>
                  <th>Delete Todo</th>
                </tr>
              </thead>
              <tbody>
                {this.state.todos.map((todo) => (
                  <tr>
                    <td>{todo.id}</td>
                    <td>{todo.description}</td>
                    <td>{todo.done.toString()}</td>
                    <td>{moment(todo.targetDate).format("DD-MM-YYYY")}</td>
                    <td><button className="btn btn-success" onClick={()=> this.updateTodoClicked(todo.id)}>Update</button></td>
                    <td><button className="btn btn-warning" onClick={()=> this.deleteTodoClicked(todo.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div >
            <button className="btn btn-success" onClick={()=> this.addTodoClicked()}>Add Todo</button>
          </div>
          </div>
          
        </div>
      );
    }
    componentDidMount(){
      let username = AuthenticationService.getLoggedInUser();
      this.loadTodos(username);
    }
    loadTodos(username){
      TodoDataService.executeFindAllTodos(username)
      .then( response => {
        console.log("Mount func");
        console.log(response.data[0].done.toString());
        this.setState({todos: response.data})
      })
    }
    deleteTodoClicked(id){
      let username = AuthenticationService.getLoggedInUser();
      console.log("Todo deleted "+ id+" for "+ username);
      TodoDataService.deleteTodo(username, id)
      .then( response => {
        this.setState({message: 'Todo '+id +' is Deleted Successfully'});
        console.log("great deleted");
        this.loadTodos(username);
      })
    }
  
    updateTodoClicked(id){
      let username = AuthenticationService.getLoggedInUser();
      console.log("Todo updated "+ id+" for "+ username);
      //this.props.history.push('/todos/'+id);
      this.props.navigate(`/todo/${id}`)//REACT-6
    }

    addTodoClicked(){
      let username = AuthenticationService.getLoggedInUser();
      console.log("Todo updated "+ -1+" for "+ username);
      //this.props.history.push('/todos/'+id);
      this.props.navigate(`/todo/-1`)//REACT-6
    }
  }

export default ListTodoComponent;