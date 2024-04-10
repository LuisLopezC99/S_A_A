const verifyPassword = (password, setError = (_) => {}) => {
    if (password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres");
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        setError("La contraseña debe contener al menos una letra mayúscula");
        return false;
    }

    if (!/[a-z]/.test(password)) {
        setError("La contraseña debe contener al menos una letra minúscula");
        return false;
    }

    if (!/\d/.test(password)) {
        setError("La contraseña debe contener al menos un número");
        return false;
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
        setError("La contraseña debe contener al menos un carácter especial");
        return false;
    }
    return true
}

export default verifyPassword