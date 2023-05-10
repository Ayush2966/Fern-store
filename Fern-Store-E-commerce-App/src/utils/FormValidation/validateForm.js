export const validateForm = (
    setFormError, {
        fullName,
        password,
        confirmPassword
    }) => {

    const isFullNameValid = fullName => /^[A-Za-z ]{4,40}$/.test(fullName);
    const isPasswordValid = password => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password);
    const isConfirmPasswordMatch = (password, confirmPassword) => password.trim() === confirmPassword.trim();
    let flag = false;

    if (!isFullNameValid(fullName)) {
        setFormError({
            type: 'FULLNAME_ERROR',
            payload: 'Invalid name. Name must have atleast 4 and atmost 40 characters.'
        });
        flag = true;
    }

    if (!isPasswordValid(password)) {
        setFormError({
            type: 'PASSWORD_ERROR',
            payload: 'Password should contain atleast one digit, one lowercase, one uppercase character and  must be 8 to 32 characters long'
        });
        flag = true;
    }

    if (!isConfirmPasswordMatch(password, confirmPassword)) {
        setFormError({
            type: 'CONFIRM_PASSWORD_ERROR',
            payload: 'password does not match.'
        });
        flag = true;
    }
    if (flag)
        return false;

    setFormError({
        type: 'RESET_ERROR',
        payload: ''
    });
    return true;
}