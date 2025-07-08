import conf from '../conf/conf';

export class Service{
    async uploadTweet({ content, image }){
        const formdata = new FormData();
        formdata.append("content", content);

        if(image)
            formdata.append("image", image);

        const requestOptions = {
            method: "POST",
            body: formdata,
            credentials: "include",
            redirect: "follow"
        };

        try {
            const response = await fetch(`${conf.renderUrl}/tweet/t/upload`, requestOptions);
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
    };

    async updateLikes({ tweetId }){
        const requestOptions = {
            method: "GET",
            credentials: "include",
            redirect: "follow"
        };

        try {
            const response = await fetch(`${conf.renderUrl}/like/tweet/${tweetId}`, requestOptions);
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
            console.log(error);
            throw error; 
        }
    }

    async getUserPosts({ username }){
        const requestOptions = {
            method: "GET",
            credentials: "include",
            redirect: "follow"
        };

        try {
            const response = await fetch(`${conf.renderUrl}/home/user-content/${username}`, requestOptions);
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
}

const service = new Service;

export default service;