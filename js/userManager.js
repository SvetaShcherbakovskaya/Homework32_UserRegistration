function createUserManager() {

    // Внутренний массив пользователей
    const users = [];

    // Добавление пользователя
    function addUser(user) {
        users.push(user);
    }

    // Получение копии массива
    function getUsers() {
        return [...users];
    }

    // НОВОЕ: удаление пользователя по ID
    function removeUser(id) {

        const index = users.findIndex(
            user => user.id === id
        );

        if (index === -1) {
            return false;
        }

        users.splice(index, 1);

        return true;
    }

    // Возвращаем доступные методы
    return {
        addUser,
        getUsers,
        removeUser
    };
}