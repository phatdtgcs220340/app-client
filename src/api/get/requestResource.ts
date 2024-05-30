import axios from 'axios';
import {accessToken, resourceBaseURL} from '../../env';

const CODEMAP: Map<number, string> = new Map<number, string>([
    [404, "Error: Account Not Found"],
    [409, "Error: Application existed"],
    [500, "Error: Cannot connect to the server"]
]);
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
export default CODEMAP