import axios from "axios";

const getTodo = async (userId) => {
    return await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
}

const markDoneTodo = async (taskId) => {
    return await axios.patch(
        `https://jsonplaceholder.typicode.com/todos/${taskId}`,
        {
            completed: true
        }
    );
}

export const todoService = {
    getTodo,
    markDoneTodo
};