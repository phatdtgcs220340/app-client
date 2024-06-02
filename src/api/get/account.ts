import { getResource } from "./requestResource"
interface Account {
    id : string,
    username : string,
    password : string,
    applicationName : string,
    type: string,
    dateAudit : string
}
export async function setAccount(applicationId : string, account : Account) {
    return await getResource(`account?applicationId=${applicationId}&decrypted=true`)
        .then((data: Account) => {
            account.id = data.id;
            account.username = data.username;
            account.password = data.password;
            account.applicationName = data.applicationName;
            account.type = data.type;
            account.dateAudit = data.dateAudit;
        })
}
export default Account;