let nextUserId = 1;

function createUser ({ name, age, ...extra }) {
    if (typeof name !== "string" || !name.trim()) {
        throw new Error("Name is required");
    }

    if (age === undefined || age === null ||
        String(age).trim() === "") {
        throw new Error("Age is required");
    }

    const userAge = Number(age);

    if (!Number.isInteger(userAge) ||
        userAge < 0 || userAge > 120) {
        throw new Error("Invalid age");
    }

    return {
        ...extra,
        id: nextUserId++,
        name: name.trim(),
        age: userAge
    };
}
