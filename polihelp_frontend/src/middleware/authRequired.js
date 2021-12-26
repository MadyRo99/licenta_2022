export default function authRequired({ next, router }) {
    if (!localStorage.getItem('jwt')) {
        return router.push({ name: 'login' }).catch(()=>{});
    }

    return next();
}