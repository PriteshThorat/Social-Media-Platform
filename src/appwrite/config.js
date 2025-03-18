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

    async createTweet({user_id, content, media_url, likes, created_at}){
        try {
            return await this.databases.createDocument(
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
            console.log("At createTweet, Error: ", error);
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
    }

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
    }

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
    }

    async getPosts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTweetsCollectionId,
                [
                    Query.equal('status', 'active')
                ]
            );
        } catch (error) {
            console.log("At getPosts, Error: ", error);
            return false;
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
                file
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