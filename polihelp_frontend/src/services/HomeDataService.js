import http from "../http-common";

class HomeDataService {
    getAll() {
        return http.get("getAll")
    }
}

export default new HomeDataService()