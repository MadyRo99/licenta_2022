import http from "../../http-common"
import authHeader from "./AuthHeaderService"

class UserService {
    getUserBoard() {
        return http.get("user", { headers: authHeader() })
    }

    getNrOfFriends(data) {
        return http.post("users/getNrOfFriends/" + data.userId, {
            token: localStorage.getItem("jwt"),
        })
    }

    getFriends(data) {
        return http.post("users/getFriends/" + data.userId, {
            token: localStorage.getItem("jwt"),
        })
    }

    getFriendRequests(data) {
        return http.post("users/getFriendRequests/" + data.userId, {
            token: localStorage.getItem("jwt"),
        })
    }

    addFriend(data) {
        return http.post("users/addFriend/", {
            addFriendUserId: data.addFriendUserId,
            authUserId: data.authUserId,
            isDelete: data.isDelete,
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }

    removeFriend(data) {
        return http.post("users/removeFriend/", {
            removeFriendUserId: data.removeFriendUserId,
            authUserId: data.authUserId,
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }

    uploadProfileImage(data) {
        return http.post("users/uploadProfileImage/", {
            userId: data.userId,
            image: data.image,
            fileExtension: data.fileExtension,
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }
}

export default new UserService()