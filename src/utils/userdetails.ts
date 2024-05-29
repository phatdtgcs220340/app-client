import { getResource } from './requestResource';
interface User {
    fullName: string,
    username: string
}
export async function setUserDetails(user : User) {
    await getResource('user')
        .then((data : User) => {
            user.fullName = data.fullName;
            user.username = data.username
        })
        .catch(() => {
            user.fullName = "Dummy name"
            user.username = "Dummy username"
        })
}
export default User;