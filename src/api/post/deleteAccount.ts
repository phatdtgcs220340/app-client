import axios from "axios";
import { getAccessToken, resourceBaseURL } from "../../env";
import { exchangeRefreshToken } from "../../logic/exchangeAccessToken";
import { logout } from "../../logic/authenticate";

let accessToken  = getAccessToken()
/**
 * Delete account function that do DELETE request to the web server
 * @param
 * @returns A Promise 
 */
export async function deleteAccount(id : String) {
    return await axios.delete(`${resourceBaseURL}/api/v1/account?accountId=${id}`,
        {
            headers : {
                'Authorization' : `Bearer ${accessToken}`,
                'Content-Type' : 'application/json'
            }
        })
        .catch(async () => {
            await exchangeRefreshToken()
            accessToken = getAccessToken()
        })
        .catch(logout)
}