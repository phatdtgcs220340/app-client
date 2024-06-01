import axios from "axios";
import { getAccessToken, resourceBaseURL } from "../../env";

/**
 * Delete account function that do DELETE request to the web server
 * @param
 * @returns A Promise 
 */
export async function deleteAccount(id : String) {
    return await axios.delete(`${resourceBaseURL}/api/v1/account?accountId=${id}`,
        
        {
            headers : {
                'Authorization' : `Bearer ${getAccessToken()}`,
                'Content-Type' : 'application/json'
            }
        })
}