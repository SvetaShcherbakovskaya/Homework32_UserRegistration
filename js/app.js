// Находим элементы HTML
const form = document.querySelector("#registration-form");
const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const errorMessage = document.querySelector("#error-message");
const usersList = document.querySelector("#users-list");

// НОВОЕ: счётчик и фильтры
const userCount = document.querySelector("#user-count");
const showAllButton = document.querySelector("#show-all");
const showAdultsButton = document.querySelector("#show-adults");

// Создаём менеджер пользователей
const userManager = createUserManager();

// НОВОЕ: текущий фильтр
let activeFilter = "all";

// Функция отображения пользователей
function renderUsers(users) {

    // Очищаем старый список
    usersList.replaceChildren();

    // НОВОЕ: обновляем количество пользователей
    userCount.textContent = `Total users: ${users.length}`;

    // НОВОЕ: применяем фильтр
    const visibleUsers = activeFilter === "adults"
        ? users.filter(({ age }) => age >= 18)
        : users;

    // Перебираем пользователей
    visibleUsers.forEach(({ id, name, age }) => {

        const li = document.createElement("li");

        const span = document.createElement("span");

        // НОВОЕ: отображаем ID, имя и возраст
        span.textContent = `ID: ${id} | ${name}, ${age} years old`;

        // НОВОЕ: создаём кнопку Delete
        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        // НОВОЕ: удаляем пользователя
        deleteButton.addEventListener("click", function () {

            const removed = userManager.removeUser(id);

            if (removed) {
                console.log("User deleted, ID:", id);
            }

            // Получаем обновлённый список
            const users = userManager.getUsers();

            // Обновляем страницу
            renderUsers(users);
        });

        li.append(span, deleteButton);
        usersList.append(li);
    });
}


// НОВОЕ: функция переключения фильтров
function setFilter(filter) {

    activeFilter = filter;

    showAllButton.classList.toggle(
        "active", filter === "all"
    );

    showAdultsButton.classList.toggle(
        "active", filter === "adults"
    );

    console.log("Filter changed:", filter);

    const users = userManager.getUsers();

    renderUsers(users);
}

// НОВОЕ: кнопка Show All
showAllButton.addEventListener("click", function () {
    setFilter("all");
});

// НОВОЕ: кнопка Show Adults
showAdultsButton.addEventListener("click", function () {
    setFilter("adults");
});


// Обрабатываем отправку формы
form.addEventListener("submit", function (event) {

    // Предотвращаем перезагрузку страницы
    event.preventDefault();
    try {

        // Убираем предыдущую ошибку
        errorMessage.textContent = "";

        // Получаем данные из полей
        const name = nameInput.value;
        const ageValue = ageInput.value;

        // Проверяем пустой возраст
        if (ageValue.trim() === "") {
            throw new Error("Age is required");
        }

        // Преобразуем возраст в число
        const age = Number(ageValue);

        // Создаём пользователя
        const user = createUser({ name, age });

        // Добавляем пользователя
        userManager.addUser(user);

        // Получаем всех пользователей
        const users = userManager.getUsers();

        // Обновляем список
        renderUsers(users);

        // Выводим информацию в Console
        console.log("User registered:", user);

        // Очищаем форму
        form.reset();

    } catch (error) {

        // Выводим ошибку в Console
        console.error(error.message);

        // Показываем ошибку на странице
        errorMessage.textContent = error.message;

    } finally {

        // Выполняется после каждой попытки регистрации
        console.log("Registration attempt completed");
    }
});

// Показываем начальный список
renderUsers(userManager.getUsers());