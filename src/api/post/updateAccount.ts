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
 * Update account function that do POST request to the web server
 * @returns A Promise
 * @param form
 */
export async function updateAccount(form : Form) {
    return await axios.patch(`${resourceBaseURL}/api/v1/account`,
        {
            "id" : form.id,
            "newPassword" : form.password
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