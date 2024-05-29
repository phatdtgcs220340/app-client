import axios from 'axios';
import {accessToken, resourceBaseURL} from '../env';
export async function getResource(resource : string) {
    return await axios.get(`${resourceBaseURL}/api/v1/${resource}`,{
            headers : {
                'Authorization' : `Bearer ${accessToken}`
            }
        })
        .then((response) => {
            return response.data
        })
}