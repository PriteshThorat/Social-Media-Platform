import { Client, Databases, ID, Storage, Query } from "appwrite";
import conf from '../conf/conf';

export class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createTweet({slug, user_id, content, media_code, username, profile_code}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTweetsCollectionId,
                slug,
                {
                    user_id,
                    content,
                    media_code,
                    username,
                    profile_code
                }
            );
        } catch (error) {
            console.log("At createTweet, Error: ", error);
        }
    };

    async createUsers({slug, username, email, profile_code}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.apwwriteUsersCollectioId,
                slug,
                {
                    username,
                    email,
                    profile_code
                }
            );
        } catch (error) {
            console.log("At createUsers, Error: ", error);
        }
    };

    async updateLikedTweets(slug, {likedTweet}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.apwwriteUsersCollectioId,
                slug,
                {
                    likedTweet
                }
            );
        }catch(error){
            console.log("At updateLikedTweets, Error: ", error);
        }
    }

    async updateLikes(slug, {likes}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTweetsCollectionId,
                slug,
                {
                    likes
                }
            );
        }catch(error){
            console.log("At updateLikes, Error: ", error);
        }
    }

    async updateTweet(slug, {user_id, content, media_url, created_at}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTweetsCollectionId,
                slug,
                {
                    user_id,
                    content,
                    media_url,
                    created_at
                }
            );
        } catch (error) {
            console.log("At updateTweet, Error: ", error);
        }
    };

    async deleteTweet(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTweetsCollectionId,
                slug,
            );
            return true;
        } catch (error) {
            console.log("At deleteTweet, Error: ", error);
            return false;
        }
    };

    async getUsers(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.apwwriteUsersCollectioId,
                slug
            )
        } catch (error) {
            console.log("At getPost, Error: ", error);
            return false;
        }
    };

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTweetsCollectionId,
                slug
            )
        } catch (error) {
            console.log("At getPost, Error: ", error);
            return false;
        }
    };

    async getUserByEmail(email) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.apwwriteUsersCollectioId,
                [Query.equal("email", email)] 
            );
            
            return response.documents.length ? response.documents[0] : null;
        } catch (error) {
            console.log("At getUserByEmail, Error: ", error);
            return null;
        }
    }

    async getPosts(){
        const requestOptions = {
            method: "GET",
            credentials: "include",
            redirect: "follow"
        };

        try {
            const response = await fetch(`${conf.renderUrl}/home/all-content`, requestOptions);
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

    async uploadTweetFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteTweetsBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("At uploadFiles, Error: ", error);
            return false;
        }
    }

    async deleteTweetFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteTweetsBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("At uploadFile, Error: ", error);
            return false;
        }
    }

    async getTweetFilePreview(fileId){
        try {
            return this.storage.getFilePreview(
                conf.appwriteTweetsBucketId,
                fileId
            );
        } catch (error) {
            console.log("At getFilePreview, Error: ", error);
        }
    }

    async uploadProfileFile(fileId){
        try {
            return await this.storage.createFile(
                conf.appwriteProfileBucketId,
                ID.unique(),
                fileId
            );
        } catch (error) {
            console.log("At uploadFiles, Error: ", error);
            return false;
        }
    }

    async deleteProfileFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteProfileBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("At uploadFile, Error: ", error);
            return false;
        }
    }

    async getProfileFilePreview(fileId){
        try {
            return this.storage.getFilePreview(
                conf.appwriteProfileBucketId,
                fileId
            );
        } catch (error) {
            console.log("At getFilePreview, Error: ", error);
        }
    }
}

const service = new Service;

export default service;