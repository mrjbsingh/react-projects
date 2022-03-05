import axios from "axios";

class TodoDataService{
    executeFindAllTodos(username){
        console.log("Service call to Bean "+ username);
        console.log('http://localhost:8080/users/'+username+'/todos');
        console.log(axios.get('http://localhost:8080/users/'+username+'/todos'));
        return axios.get('http://localhost:8080/users/'+username+'/todos');
 
    }

    executeTodoById(username, id){
        console.log("Todo by id "+ id);
        console.log('http://localhost:8080/users/'+username+'/todo/'+id);
        //console.log(axios.get('http://localhost:8080/users/'+username+'/todos'));
        return axios.get('http://localhost:8080/users/'+username+'/todo/'+id);
 
    }
    
    deleteTodo(username, id){
        console.log("Service call for deleting Todo "+ username);
        console.log('http://localhost:8080/users/'+username+'/todos/'+id);
        //console.log(axios.delete('http://localhost:8080/users/'+username+'/todos/'+id));
        return axios.delete('http://localhost:8080/users/'+username+'/todos/'+id);
    }

}

export default new TodoDataService();