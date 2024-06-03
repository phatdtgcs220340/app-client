import axios from "axios";
import {authBaseURL, authorLink} from "../env.ts";

interface LoginForm{
    username : string,
    password : string
}
export function logout() {
    window.localStorage.clear();
    window.location.assign("/login")
}
export async function login(form : LoginForm) {
    return axios.post(`${authBaseURL}/api/login`, {
        username: form.username,
        password: form.password,
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Ensure the correct content type
        },
        withCredentials: true, // Again, to preserve the session/cookies
    })
        .then(() => window.location.assign(authorLink))
}