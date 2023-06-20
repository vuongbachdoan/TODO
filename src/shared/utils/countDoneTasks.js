export const countDoneTask = (tasks) => {
    let counter = 0;
    for(let index = 0; index < tasks.length; ++index) {
        if(tasks[index].completed) ++counter;
    } 
    return counter;
}