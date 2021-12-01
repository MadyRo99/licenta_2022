import http from "../../http-common"
import authHeader from "./AuthHeaderService"

class UserService {
    getPublicContent() {
        return http.get("all")
    }

    getUserBoard() {
        return http.get("user", { headers: authHeader() })
    }
}

export default new UserService()