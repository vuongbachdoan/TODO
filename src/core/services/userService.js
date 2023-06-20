import axios from "axios";

const getUsers = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/users')
}

export const userService = {
    getUsers
}