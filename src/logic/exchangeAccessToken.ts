import axios from "axios";
import { clientId, clientSecret, redirectUri, tokenEndpoint } from "../env";
const HEADER = {
    headers : {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : `Basic ${btoa(`${clientId}:${clientSecret}`)}`
    }
}
export async function exchangeAccessToken(authorizationCode : string | null) {
    await axios.post(tokenEndpoint,
        {
            grant_type : 'authorization_code',
            redirect_uri : redirectUri,
            code: authorizationCode
        }, HEADER)
    .then((response) => {
        const data = response.data;
        window.localStorage.setItem("access_token", data.access_token);
        window.localStorage.setItem("refresh_token", data.refresh_token);
    })
    .catch(async () => {
        await axios.post(tokenEndpoint, 
            {
                grant_type: 'refresh_token',
                refresh_token: window.localStorage.getItem("refresh_token")
            }
        )
        .then((r) => {
            const data = r.data;
            window.localStorage.setItem("access_token", data.access_token);
        })
    })
}