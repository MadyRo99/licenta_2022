export default class User {
    constructor(lastName, firstName, email, password, gender, year, role, faculty) {
        this.lastName = lastName
        this.firstName = firstName
        this.email = email
        this.password = password
        this.gender = gender
        this.year = year
        this.roleId = role
        this.facultyId = faculty
    }
}