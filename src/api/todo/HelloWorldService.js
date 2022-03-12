import axios from "axios";

class HelloWorldService{

    executHelloWorldService(){
        console.log("Service call executed");
        //console.log(axios.get('http://localhost:8080/hello-bean/pv/jay'));
        return axios.get('http://localhost:8080/hello-bean/pv/jay');
    }
    executHelloWorldPathVariableService(name){
        console.log("Service call to Bean "+ name);
        let username="user"
        let password="password"

        let basicAuthHeader = 'Basic ' + window.btoa(username+ ":" + password);  //base64 encoding
        // console.log(axios.get('http://localhost:8080/hello-bean/pv/jay'), {
        //     headers:{
        //         authorization: basicAuthHeader
        //     }});
        return axios.get('http://localhost:8080/hello-bean/pv/'+name
        // , {
        //     headers:{
        //         authorization: basicAuthHeader
        //     }
        // }
        );
    }
    
}
export default new HelloWorldService();