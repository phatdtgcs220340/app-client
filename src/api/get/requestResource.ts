import axios from 'axios';
import { getAccessToken, resourceBaseURL} from '../../env';
import { exchangeRefreshToken } from '../../logic/exchangeAccessToken';

let accessToken = getAccessToken()
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
        .catch(async () => {
            await exchangeRefreshToken()
            accessToken = getAccessToken()
        })
}
export default CODEMAP