import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "newsfeed",
            component: () => import("./components/views/HelloWorld")
        },
        {
            path: "/home",
            name: "newsfeed",
            component: () => import("./components/views/HelloWorld")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./components/views/authentication/Login")
        },
        {
            path: "/register",
            name: "register",
            component: () => import("./components/views/authentication/Register")
        },
        {
            path: "/profile",
            name: "profile",
            component: () => import("./components/views/authentication/Profile")
        }
    ]
});