export default function guestRequired({ next }) {
    if (!localStorage.getItem('jwt')) {
        return next()
    }
}