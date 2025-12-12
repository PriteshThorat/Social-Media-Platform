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
            const response = await fetch(`${conf.vercelUrl}/tweet/t/upload`, requestOptions);
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
            const response = await fetch(`${conf.vercelUrl}/like/tweet/${tweetId}`, requestOptions);
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
            const response = await fetch(`${conf.vercelUrl}/home/all-content`, requestOptions);
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
            const response = await fetch(`${conf.vercelUrl}/home/user-content/${username}`, requestOptions);
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

    async deletePost({ tweetId }){
        const requestOptions = {
            method: "DELETE",
            credentials: "include",
            redirect: "follow"
        };

        try {
            const response = await fetch(`${conf.vercelUrl}/tweet/t/delete/${tweetId}`, requestOptions);
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

    async updatePost({ content, tweetId }){
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        const raw = JSON.stringify({
            "content": content,
        })

        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            credentials: "include",
            body: raw,
            redirect: "follow"
        }

        try {
            const response = await fetch(`${conf.vercelUrl}/tweet/t/update/${tweetId}`, requestOptions)
            if (!response.ok) {
                const errData = await response.json()
                throw new Error(errData.message || "Unknown error")
            }

            const result = await response.json()
        
            return result
        } catch (error) {
            console.log(error);
            throw error; 
        }
    }
}

const service = new Service;

export default service;