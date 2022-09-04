import Vue from "vue"
import Router from "vue-router"
import authRequired from './middleware/authRequired'
import guestRequired from './middleware/guestRequired'
import store from './store'

Vue.use(Router)

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "newsfeed",
            component: () => import("./components/views/NewsFeed"),
            meta: {
                middleware: authRequired
            }
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./components/views/authentication/Login"),
            meta: {
                middleware: guestRequired
            }
        },
        {
            path: "/register",
            name: "register",
            component: () => import("./components/views/authentication/Register"),
            meta: {
                middleware: guestRequired
            }
        },
        {
            path: "/logout",
            name: "logout",
            component: () => {
                store.dispatch('auth/logout', {root: true}).then(
                    () => {
                        router.push("login")
                    }
                )
            },
            meta: {
                middleware: authRequired
            }
        },
        {
            path: "/addEvent",
            name: "addEvent",
            component: () => import("./components/views/AddEvent"),
            meta: {
                middleware: authRequired
            }
        },
        {
            path: "/notifications",
            name: "notifications",
            component: () => import("./components/views/Notifications"),
            meta: {
                middleware: authRequired
            }
        },
        {
            path: "/profile/:id",
            name: "profile",
            component: () => import("./components/views/Profile"),
            meta: {
                middleware: authRequired
            }
        },
        {
            path: "*",
            name: "pageNotFound",
            component: () => import("./components/views/PageNotFound")
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]

        const context = { from, next, router, to }
        const nextMiddleware = nextFactory(context, middleware, 1)

        return middleware[0]({ ...context, next: nextMiddleware })
      }

      return next()
})

function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index]

    if (!subsequentMiddleware) {
        return context.next
    }

    return (...parameters) => {
        context.next(...parameters)
        const nextMiddleware = nextFactory(context, middleware, index + 1)
        subsequentMiddleware({ ...context, next: nextMiddleware })
    };
}

export default router