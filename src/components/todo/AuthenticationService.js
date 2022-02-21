

class AuthenticationService{
    registerUser(username, password) {
        console.log("register Success");
       sessionStorage.setItem('authenticatedUser', username);
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
}

export default new AuthenticationService()
