// Находим элементы HTML
const form = document.querySelector("#registration-form");
const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const errorMessage = document.querySelector("#error-message");
const usersList = document.querySelector("#users-list");

// Создаём менеджер пользователей
const userManager = createUserManager();

// Функция отображения пользователей
function renderUsers(users) {
    usersList.replaceChildren();

    users.forEach(({ name, age }) => {
        const li = document.createElement("li");
        li.textContent = `${name}, ${age} years old`;
        usersList.append(li);
    });
}

// Обрабатываем отправку формы
form.addEventListener("submit", function (event) {
    event.preventDefault();

    try {
        errorMessage.textContent = "";

        const name = nameInput.value;
        const ageValue = ageInput.value;

        if (ageValue.trim() === "") {
            throw new Error("Age is required");
        }

        const age = Number(ageValue);
        const user = createUser({ name, age });

        userManager.addUser(user);

        const users = userManager.getUsers();
        renderUsers(users);

        console.log("User registered:", user);

        form.reset();

    } catch (error) {
        console.error(error.message);
        errorMessage.textContent = error.message;

    } finally {
        console.log("Registration attempt completed");
    }
});