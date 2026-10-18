function createUserManager() {
    const users = [];

    function addUser(user) {
        users.push(user);
    }

    function getUsers() {
        return [...users];
    }

    return {
        addUser,
        getUsers
    };
}