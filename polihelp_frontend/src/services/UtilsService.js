import http from "../http-common";

class UtilsService {
    getFaculties() {
        return http.get("getAllFaculties")
    }

    getRoles() {
        return http.get("getAllRoles")
    }
}

export default new UtilsService()