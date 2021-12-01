import http from "../http-common";

class HomeDataService {
    getAll() {
        return http.get("getAll")
    }
    getFaculties() {
        return http.get("getFaculties")
    }
}

export default new HomeDataService()