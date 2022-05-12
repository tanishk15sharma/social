import { EMAIL_REGEX, PASSWORD_UPPERCASE_REGEX } from "./regexp";

const validLogin = ({ username, password }, initialErrors) => {
  if (!username)
    return {
      inValid: false,
      errors: {
        ...initialErrors,
        username: "Username is Required!",
      },
    };
  if (!password)
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        password: "Password is Required",
      },
    };
  return {
    isValid: true,
    errors: {
      username: "",
      password: "",
    },
  };
};

const validSignUp = (
  { name, username, email, password, confirmPassword, terms },
  initialErrors
) => {
  if (!name)
    return {
      isValid: false,
      errors: { ...initialErrors, firstName: "User Name is Required" },
    };

  if (!username)
    return {
      isValid: false,
      errors: { ...initialErrors, username: "Unique username is Required" },
    };
  if (!email)
    return {
      isValid: false,
      errors: { ...initialErrors, username: "Email is Required" },
    };
  if (!PASSWORD_UPPERCASE_REGEX.test(password))
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        password: "Password must contain atleast 1 Uppercase Letter",
      },
    };

  if (password !== confirmPassword)
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        confirmPassword: "Password does not match",
      },
    };
  if (!terms)
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        terms: "Accept Terms & Conditions",
      },
    };
  return {
    isValid: true,
    errors: {
      name: "",
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
    },
  };
};

export { validLogin, validSignUp };
