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
}

export default new PostsService()