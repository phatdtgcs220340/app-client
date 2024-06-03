import axios from 'axios';
import { getAccessToken, resourceBaseURL } from "../../env";
import { exchangeRefreshToken } from "../../logic/exchangeAccessToken";
import { logout } from "../../logic/authenticate";

interface Form {
    id : string,
    password: string
}
let accessToken = getAccessToken()
/**
 * Create account function that do POST request to the web server
 * @param
 * @returns A Promise 
 */
export async function updateAccount(form : Form) {
    return await axios.patch(`${resourceBaseURL}/api/v1/account`,
        {
            "id" : form.id,
            "password" : form.password
        },
        {
            headers : {
                'Authorization' : `Bearer ${accessToken}`,
                'Content-Type' : 'application/json'
            }
        })
        .then((response) => {
            return response.data
        })
        .catch(async () => {
            await exchangeRefreshToken()
            accessToken = getAccessToken()
        })
        .catch(logout)
}