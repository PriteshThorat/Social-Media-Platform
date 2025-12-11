import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    user: null,
    tweets: [],
    temp: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
            state.user = action.payload
        },
        pass: (state, action) => {
            state.temp = action.payload
        },
        logout: state => {
            state.status = false
            state.user = null
            state.tweets = []
        },
        addTweets: (state, action) => {
            state.tweets = action.payload
        },
        removeTweets: state => {
            state.tweets = null
        },
        preChangeAvatar: (state, action) => {
            state.user.avatar = action.payload

            const userId = state.user._id

            state.tweets = state.tweets.map(tweet => {
                if (tweet.owner[0]._id === userId) {
                    return {
                        ...tweet,
                        owner: [
                            {
                                ...tweet.owner[0],
                                avatar: action.payload
                            }
                        ]
                    }
                }

                return tweet
            })
        },
        postChangeAvatar: (state, action) => {
            state.user.avatar = action.payload

            const userId = state.user._id

            state.tweets = state.tweets.map(tweet => {
                if (tweet.owner[0]._id === userId) {
                    return {
                        ...tweet,
                        owner: [
                            {
                                ...tweet.owner[0],
                                avatar: action.payload
                            }
                        ]
                    }
                }

                return tweet
            })
        }
    }
})

export const { login, pass, logout, addTweets, removeTweets, preChangeAvatar, postChangeAvatar } = authSlice.actions;
export default authSlice.reducer;