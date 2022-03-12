export default class User {
    constructor(lastName, firstName, email, password, year, role, faculty) {
        this.lastName = lastName
        this.firstName = firstName
        this.email = email
        this.password = password
        this.year = year
        this.roleId = role
        this.facultyId = faculty
    }
}