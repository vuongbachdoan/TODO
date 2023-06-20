import { Button, Container, Dropdown, Row, Spacer, Table, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { userService } from './core/services/userService';
import { todoService } from './core/services/todoService';
import { DoneIcon } from './shared/icons/doneIcon';
import { InprogressIcon } from './shared/icons/inprogressIcon';
import { countDoneTask } from './shared/utils/countDoneTasks';
import { sortTodos } from './shared/utils/sortTodo';

export default function App() {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [doneTasksNum, setDoneTasksNum] = useState(0);
    const [isLoading, toggleLoading] = useState(false);
    const [taskPending, setTaskPending] = useState(null);

    // Get users
    useEffect(() => {
        userService.getUsers()
            .then(
                (res) => {
                    setUsers(res.data);
                }
            )
    }, []);

    // Get tasks
    useEffect(() => {
        if (currentUser !== '') {
            todoService.getTodo(currentUser)
                .then(
                    (res) => {
                        setTasks(sortTodos(res.data));
                        setDoneTasksNum(countDoneTask(res.data));
                    }
                )
        }
    }, [currentUser]);

    const markDone = (taskId) => {
        toggleLoading(true);
        setTaskPending(taskId);
        todoService.markDoneTodo(taskId)
            .then(
                (res) => {
                    setTasks(
                        sortTodos(tasks.map((task) => {
                            if (task.id === taskId) {
                                task = res.data;
                            }
                            return task;
                        }))
                    );
                    setTaskPending(null);
                    toggleLoading(false);
                }
            )
    }

    // Update number of tasks done
    useEffect(() => {
        setDoneTasksNum(countDoneTask(tasks));
    }, [tasks])

    return (
        <Container>
            <Spacer y={1} />
            <Text h4 color='secondary'>USER</Text>
            <Dropdown>
                <Dropdown.Button flat color="secondary">
                    {
                        currentUser === '' ?
                        'Select User' :
                        users[currentUser].name
                    }
                </Dropdown.Button>
                <Dropdown.Menu
                    color="secondary"
                    aria-label="Actions"
                    css={{ $$dropdownMenuWidth: "280px", maxHeight: "150px" }}
                    onAction={(index) => setCurrentUser(index)}
                >
                    {
                        users.map((user) => {
                            return (
                                <Dropdown.Item
                                    key={user.id}
                                    command="⌘"
                                    description="Todo user"
                                    value={user.id}
                                >
                                    {user.name}
                                </Dropdown.Item>
                            )
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
            <Spacer y={1} />
            <Row justify='space-between'>
                <Text h4 color='secondary'>TASKS</Text>
                <Text color='secondary'>Done {doneTasksNum}/{tasks.length} tasks</Text>
            </Row>
            <Table
                bordered
                shadow={true}
                aria-label="pagination  table"
                color={"secondary"}
                css={{
                    height: "auto",
                    width: "stretch"
                }}
            >
                <Table.Header>
                    <Table.Column align='start'>TASK</Table.Column>
                    <Table.Column align='end'>STATUS</Table.Column>
                </Table.Header>
                <Table.Body>
                    {
                        tasks.length === 0 &&
                        <Table.Row>
                            <Table.Cell>
                                <Text color='secondary'>-- No data --</Text>
                            </Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>

                    }
                    {
                        tasks.map((task) => {
                            return (
                                <Table.Row key={task.id}>
                                    <Table.Cell>
                                        <Row align='center'>
                                            {
                                                task.completed ?
                                                    <DoneIcon width={48} fill={"#13a452"} /> :
                                                    <InprogressIcon width={48} fill={"#f5a524"} />
                                            }
                                            {task.title}
                                        </Row>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {
                                            !task.completed &&
                                            <Button
                                                flat
                                                color="warning"
                                                auto
                                                onClick={() => markDone(task.id)}
                                                icon={
                                                    isLoading && (taskPending === task.id) ?
                                                        <div className='animate--dual-ring'></div> :
                                                        <></>
                                                }
                                                style={{
                                                    float: 'right'
                                                }}
                                            >
                                                Mark done
                                            </Button>
                                        }
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
                <Table.Pagination
                    shadow
                    noMargin
                    align="center"
                    rowsPerPage={10}
                />
            </Table>
            <Spacer y={2} />
        </Container>
    );
};