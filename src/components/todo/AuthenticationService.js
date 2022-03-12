

import axios from "axios";

class AuthenticationService{
    registerUser(username, password) {
        console.log("register Success");
        let basicAuthHeader = 'Basic ' + window.btoa(username+ ":" + password);  //base64 encoding
       
       sessionStorage.setItem('authenticatedUser', username);
       this.setUpAxiosInterceptor(basicAuthHeader);
    }
    logoutUser(username){
        console.log("Logout success");
        sessionStorage.removeItem('authenticatedUser');
    }
    isUserLoggedIn(){
        console.log("Logout success");
        let user = sessionStorage.getItem('authenticatedUser');
        if (user === null) return false;
        else return true;
    }
    getLoggedInUser(){
        console.log("getting logged in user");
        let user = sessionStorage.getItem('authenticatedUser');
        if (user === null) return '';
        else return user;
    }

    setUpAxiosInterceptor(basicAuthHeader){
        console.log("interceptor setup")
         
        axios.interceptors.request.use(
            (config)=>{
                if(this.isUserLoggedIn()){
                    config.headers.Authorization = basicAuthHeader;
                }
                return config;
            }
        )
    }
}

export default new AuthenticationService()
