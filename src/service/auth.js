import conf from '../conf/conf'
export class AuthService {

    async createAccount({ username, fullName, email, password }) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": username,
            "fullName": fullName,
            "email": email,
            "password": password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${conf.renderUrl}/users/create-account`, requestOptions);
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Unknown error");
            }

            const result = await response.json();
        
            return result; 
        } catch (error) {
            console.log(error);
            throw error; 
        }
    }

    async login({ email, password }){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": email,
            "password": password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            credentials: "include",
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${conf.renderUrl}/users/login`, requestOptions);
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Unknown error");
            }

            const result = await response.json();
        
            return result; 
        } catch (error) {
            console.log(error)
            throw error; 
        }
    }

    async verifyOTP({ userID, userOTP }){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "userId": userID,
            "userOTP": userOTP
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${conf.renderUrl}/users/verify-otp`, requestOptions);
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Unknown error");
            }

            const result = await response.json();
        
            return result; 
        } catch (error) {
            console.log(error)
            throw error; 
        }
    }

    async getCurrentUser(){
        const requestOptions = {
            method: "GET",
            credentials: "include",
            redirect: "follow"
        };

        try {
            const response = await fetch(`${conf.renderUrl}/users/me/`, requestOptions);
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Unknown error");
            }

            const result = await response.json();
        
            return result; 
        } catch (error) {
            console.log(error);
            throw error; 
        }
    }

    async logout(){
        const requestOptions = {
            method: "GET",
            redirect: "follow",
            credentials: "include"
        };

        try {
            const response = await fetch(`${conf.renderUrl}/users/logout`, requestOptions);
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Unknown error");
            }

            const result = await response.json();
        
            return result; 
        } catch (error) {
            console.log(error);
            throw error; 
        }
    }
};

const authService = new AuthService;

export default authService;