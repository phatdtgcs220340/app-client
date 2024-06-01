import axios from "axios";
import { getAccessToken, resourceBaseURL } from "../../env";

interface Account {
    username: String,
    password: String,
    application : String, 
    type: String
}
/**
 * Create account function that do POST request to the web server
 * @param
 * @returns A Promise 
 */
export async function createAccount(form : Account) {
    return await axios.post(`${resourceBaseURL}/api/v1/account`,
        {
            "username" : form.username,
            "password" : form.password,
            "applicationName" : form.application,
            "type" : form.type
        },
        {
            headers : {
                'Authorization' : `Bearer ${getAccessToken()}`,
                'Content-Type' : 'application/json'
            }
        })
        .then((response) => {
            return response.data
        })
}