import http from "../../http-common"

class AuthService {
    login(user) {
        return http.get("users/signin", {
            username: user.username,
            password: user.password
        }).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }

            return response.data
        })
    }

    register(user) {
        return http.post("users/signup", {
            lastName: user.lastName,
            firstName: user.firstName,
            email:    user.email,
            password: user.password,
            gender: user.gender,
            year: user.year,
            roleId: user.roleId,
            facultyId: user.facultyId
        })
    }

    logout() {
        localStorage.removeItem('user')
    }
}

export default new AuthService()