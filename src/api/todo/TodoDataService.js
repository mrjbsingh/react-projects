import axios from "axios";

class TodoDataService{
    executeFindAllTodos(username){
        console.log("Service call to Bean "+ username);
        console.log('http://localhost:8080/users/'+username+'/todos');
        console.log(axios.get('http://localhost:8080/users/'+username+'/todos'));
        return axios.get('http://localhost:8080/users/'+username+'/todos');
 
    }

}

export default new TodoDataService();