type Users = { name: string; room: string; id: string };

const users: Users[] = [];

const addUser = ({
    id,
    name,
    room,
}: {
    id: string;
    name: string;
    room: string;
}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find(
        (user) => user.room === room && user.name === name
    );

    if (existingUser) return { error: 'userName is taken' };
    const user = { id, name, room };
    users.push(user);
    return { user };
};

const removeUser = (id: string): void | Users => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id: string): Users | undefined => {
    console.log(users);

    return users.find((user) => user.id === id);
};

const getUsersInRoom = (room: string): Users[] | undefined =>
    users.filter((user) => user.room === room);

export { addUser, getUser, getUsersInRoom, removeUser };
