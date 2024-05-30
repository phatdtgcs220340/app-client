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
        .catch(() => { 
            account.id = "2131321321";
            account.username = "dummyaccount";
            account.password = "dummypassword";
            account.applicationName = "Dummy1";
            account.type = "Dummy type";
            account.dateAudit = "29/04/2004 12:00 pm";
        })
}
export default Account;