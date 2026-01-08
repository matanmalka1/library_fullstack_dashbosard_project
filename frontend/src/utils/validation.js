export const validateEmail = (email) => {
  if (!email) return "Email is required";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "Invalid email format";
  return null;
};

export const validatePasswordStrength = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password))
    return "Password must contain an uppercase letter";
  if (!/[a-z]/.test(password))
    return "Password must contain a lowercase letter";
  if (!/\d/.test(password)) return "Password must contain a number";
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return "Password must contain a special character (!@#$%^&*)";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
};

export const validateFirstName = (firstName) => {
  if (!firstName) return "First name is required";
  if (firstName.trim().length < 2)
    return "First name must be at least 2 characters";
  if (firstName.length > 50)
    return "First name must be less than 50 characters";
  return null;
};

export const validateLastName = (lastName) => {
  if (!lastName) return "Last name is required";
  if (lastName.trim().length < 2)
    return "Last name must be at least 2 characters";
  if (lastName.length > 50) return "Last name must be less than 50 characters";
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return null; // Optional field
  const regex = /^[\d\s\-\+\(\)]{10,}$/;
  if (!regex.test(phone.replace(/\s/g, ""))) {
    return "Invalid phone number format";
  }
  return null;
};

export const validateAddress = (address) => {
  if (!address) return "Address is required";
  if (address.trim().length < 5) return "Address must be at least 5 characters";
  if (address.length > 200) return "Address must be less than 200 characters";
  return null;
};

export const validateCity = (city) => {
  if (!city) return "City is required";
  if (city.trim().length < 2) return "City must be at least 2 characters";
  if (city.length > 50) return "City must be less than 50 characters";
  return null;
};

export const validatePostalCode = (postalCode) => {
  if (!postalCode) return "Postal code is required";
  const regex = /^[\d\s\-A-Za-z]{3,10}$/;
  if (!regex.test(postalCode)) return "Invalid postal code format";
  return null;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) return "Password confirmation is required";
  if (password !== confirmPassword) return "Passwords do not match";
  return null;
};

export const getValidationErrors = (validationResults) => {
  return Object.values(validationResults).filter((err) => err !== null);
};

export const hasValidationErrors = (validationResults) => {
  return Object.values(validationResults).some((err) => err !== null);
};
