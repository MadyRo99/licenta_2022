import http from "../http-common";

class EventsService {
    createEvent(eventContent) {
        return http.post("events/createEvent", {
            name: eventContent.name,
            authorId: eventContent.authorId,
            location: eventContent.location,
            startDate: eventContent.startDate,
            endDate: eventContent.endDate,
            content: eventContent.content,
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }

    getUserEvents(data) {
        return http.post("events/getUserEvents/" + data.authorId, {
            userId: data.userId,
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }

    joinEvent(data) {
        return http.post("events/joinEvent/" + data.eventId, {
            userId: data.userId,
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }

    getNrOfEvents(data) {
        return http.post("events/getNrOfEvents/" + data.userId, {
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }

    removeJoinedEvent(data) {
        return http.post("events/removeJoinedEvent/", {
            userId: data.userId,
            eventId: data.eventId,
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }

    deleteEvent(eventId) {
        return http.post("events/deleteEvent/" + eventId, {
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }

    getNewsFeedEvents(data) {
        return http.post("events/getNewsFeedEvents/", {
            offset: data.offset,
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }

    getJoinedEvents(data) {
        return http.post("events/getJoinedEvents/" + data.userId, {
            token: localStorage.getItem("jwt"),
        })
    }
}

export default new EventsService()