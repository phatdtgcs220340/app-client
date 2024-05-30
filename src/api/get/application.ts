import { getResource } from "./requestResource"
interface Application {
    id : string,
    applicationName : string,
    type: string,
}
export async function getApplications() {
    return await getResource("application")
}
export default Application;