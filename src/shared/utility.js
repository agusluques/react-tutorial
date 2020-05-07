export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const validate = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.isEmail) {
        const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        isValid = pattern.test(value) && isValid
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    return isValid;
}