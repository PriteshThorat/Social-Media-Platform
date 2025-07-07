import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

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
            alert(error);
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
            alert(error);
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
            alert(error);
            throw error; 
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("At getCurrentUser, Error: ", error);
        }

        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("At logout, Error: ", error);
        }
    }
};

const authService = new AuthService;

export default authService;