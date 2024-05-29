import { getResource } from "./requestResource"
interface Application {
    id : string,
    applicationName : string,
    type: string,
}
export async function getApplications() {
    return await getResource("application")
        .catch(() => {
            return [
            {
                id : "2131321321",
                applicationName : "Dummy1",
                type: "Dummy type"
            },
            {
                id: "121321321321",
                applicationName : "Dummy2",
                type: "Dummy type"
            }]
        })
}
export default Application;