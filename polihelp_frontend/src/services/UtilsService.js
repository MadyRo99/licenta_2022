import http from "../http-common";

class UtilsService {
    getUserProfileDetails(userId) {
        return http.post("users/getUser/" + userId, {
            token: localStorage.getItem("jwt"),
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