export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'Password is required' };
  }

  if (password.length <= 8) {
    return { valid: false, message: 'Password must be more than 8 characters long' };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase) {
    return { valid: false, message: 'Password must include at least one uppercase letter' };
  }

  if (!hasLowerCase) {
    return { valid: false, message: 'Password must include at least one lowercase letter' };
  }

  if (!hasSpecial) {
    return { valid: false, message: 'Password must include at least one special character' };
  }

  return { valid: true };
};
