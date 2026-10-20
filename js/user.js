// Счётчик уникальных ID
let nextUserId = 1;

function createUser({ name, age, ...extra }) {

    // Проверяем имя
    if (typeof name !== "string" || !name.trim()) {
        throw new Error("Name is required");
    }

    // Проверяем пустой возраст
    if (age === undefined || age === null ||
        String(age).trim() === "") {
        throw new Error("Age is required");
    }

    // Преобразуем возраст в число
    const userAge = Number(age);

    // Проверяем допустимый возраст
    if (!Number.isInteger(userAge) ||
        userAge < 0 || userAge > 120) {
        throw new Error("Invalid age");
    }

    // Возвращаем нового пользователя
    return {
        ...extra,
        id: nextUserId++,
        name: name.trim(),
        age: userAge
    };
}
