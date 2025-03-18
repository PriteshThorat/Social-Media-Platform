const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteTweetsCollectionId: String(import.meta.env.VITE_APPWRITE_TWEETS_COLLECTION_ID),
    apwwriteUsersCollectioId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    appwriteTweetsBucketId: String(import.meta.env.VITE_APPWRITE_TWEETS_BUCKET_ID),
    appwriteProfileBucketId: String(import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID),
    tinyMceApiKey: String(import.meta.env.VITE_TINY_MCE_API_KEY)
};

export default conf;