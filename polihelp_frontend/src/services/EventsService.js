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

    deleteEvent(eventId) {
        return http.post("events/deleteEvent/" + eventId, {
            token: localStorage.getItem("jwt")
        }).then(response => {
            return response.data
        })
    }
}

export default new EventsService()