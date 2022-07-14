import http from "../http-common";

class UtilsService {
    getUserProfileDetails(data) {
        return http.post("users/getUser/" + data.userId, {
            authUser: data.authUser,
            token: localStorage.getItem("jwt"),
        })
    }

    getPostsAndEventsCount() {
        return http.post("getPostsAndEventsCount", {
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }

    getFaculties() {
        return http.get("getAllFaculties")
    }

    getInterests(userId) {
        return http.get("getInterestsByUser/" + userId)
    }

    getRoles() {
        return http.get("getAllRoles")
    }
}

export default new UtilsService()