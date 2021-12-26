import http from "../../http-common"

class AuthService {
    login(user) {
        return http.post("users/signin", {
            email: user.email,
            password: user.password
        }).then(response => {
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
        localStorage.removeItem('jwt')
    }
}

export default new AuthService()