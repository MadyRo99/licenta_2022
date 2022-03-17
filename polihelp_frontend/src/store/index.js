import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { auth } from "./auth"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {

    },
    mutations: {

    },
    actions: {

    },
    getters: {

    }
})

export default store