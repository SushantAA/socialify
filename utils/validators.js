module.exports = {
  validateRegularExpression(username, email, password, confirmPassword) {
    const errors = {};

    if (username === "") {
      errors.username = "Username should not be empty";
    }

    if (email === "") {
      errors.email = "email should not be empty";
    } else {
      let check = false;
      for (char of email) {
        if (char === "@") check = true;
      }
      if (!check) {
        errors.email = "Enter a valid email";
      }
    }

    if (password === "") {
      errors.password = "password should not be empty";
    } else if (password.length < 8) {
      errors.password = "password is very small must be at least 8";
    } else if (password !== confirmPassword) {
      errors.password = "Passwords must match";
    }

    return {
      errors,
      valid: Object.keys(errors).length < 1,
    };
  },

  validateLoginInupt(username, password) {
    const errors = {};

    if (username === "") {
      errors.username = "Username should not be empty";
    }

    if (password === "") {
      errors.password = "password should not be empty";
    } else if (password.length < 8) {
      errors.password = "password is very small must be at least 8";
    }

    return {
      errors,
      valid: Object.keys(errors).length < 1,
    };
  },
};
