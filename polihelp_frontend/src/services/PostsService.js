import http from "../http-common";

class PostsService {
    createPost(postContent) {
        return http.post("posts/createPost", {
            content: postContent,
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }

    getNewsFeedPosts(data) {
        return http.post("posts/getNewsFeedPosts/", {
            offset: data.offset,
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }

    getUserPosts(data) {
        return http.post("posts/getUserPosts/" + data.authorId, {
            userId: data.userId,
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }

    likePost(data) {
        return http.post("posts/likePost/" + data.postId, {
            userId: data.userId,
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }

    deletePost(postId) {
        return http.post("posts/deletePost/" + postId, {
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }
}

export default new PostsService()