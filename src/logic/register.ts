import axios from "axios"
import { authBaseURL } from "../env"

interface RegisterForm {
    fullName : string,
    username : string,
    password : string
}

export async function register(form : RegisterForm) {
    return await axios.post(`${authBaseURL}/api/register`, {
        fullName: form.fullName,
        username : form.username,
        password : form.password
    })
    .then(response => {
        return response.status;
    })
}