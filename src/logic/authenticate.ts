import axios from "axios";
import {authBaseURL, authorLink} from "../env.ts";

interface LoginForm{
    username : string,
    password : string
}
export async function logout() {
    window.localStorage.clear();
    window.location.assign("/login")
    await axios.get(`${authBaseURL}/api/logout`)
}
export async function login(form : LoginForm) {
    console.log(authorLink)
    await axios.post(`${authBaseURL}/api/login`, {
        username: form.username,
        password: form.password,
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Ensure the correct content type
        },
        withCredentials: true, // Again, to preserve the session/cookies
    })
    .catch(e => {
        console.log(e.code)
    })
    window.location.assign(authorLink)
}