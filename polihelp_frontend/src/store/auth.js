import AuthService from "../services/authentication/AuthService"

export const auth = {
    namespaced: true,
    state: {
        user: null,
        token: null
    },
    actions: {
        login(_, user) {
            return AuthService.login(user).then(
                user => {
                    return Promise.resolve(user)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },
        register(_, user) {
            return AuthService.register(user).then(
                response => {
                    return Promise.resolve(response.data)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },
        setUserDetails({ commit }, details) {
            commit('setUser', details.userDetails)
            commit('setToken', details.token)
            localStorage.setItem("jwt", details.token)
        },
        logout({ commit }) {
            AuthService.logout()
            commit('logout')
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
        },
        logout(state) {
            state.token = null
            state.user = null
        }
    }
}