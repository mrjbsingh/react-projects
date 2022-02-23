import axios from "axios";

class HelloWorldService{

    executHelloWorldService(){
        console.log("Service call executed");
        //console.log(axios.get('http://localhost:8080/hello-bean/pv/jay'));
        return axios.get('http://localhost:8080/hello-bean/pv/jay');
    }
    executHelloWorldPathVariableService(name){
        console.log("Service call to Bean "+ name);
        //console.log(axios.get('http://localhost:8080/hello-bean/pv/jay'));
        return axios.get('http://localhost:8080/hello-bean/pv/'+name);
    }
    
}
export default new HelloWorldService();