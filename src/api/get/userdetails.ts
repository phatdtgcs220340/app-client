import { getResource } from './requestResource';
interface User {
    fullName: string,
    username: string
}
export async function getUserDetails() {
    return await getResource('user')
        .then((data : User) => {
            return data
        })
}
export default User;