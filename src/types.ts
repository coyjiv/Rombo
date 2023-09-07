
export interface User {
    firstName: String,
    lastName: String,
    email: String,
    date: Date,
}
export interface ApiError {
    error: String,
    
}
export interface LoginValues {
    email: String,
    password: String,
}