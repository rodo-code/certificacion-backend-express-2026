export function validateRegisterUser(username, password, role) {
  if (!username || !password || !role) {
    return "Fields 'username', 'password' and 'role' are required";
  }

  if (typeof username !== "string" || username.trim().length < 3) {
    return "Field 'username' must be a string with at least 3 characters";
  }

  if (typeof password !== "string" || password.length < 6) {
    return "Field 'password' must contain at least 6 characters";
  }

  if (role !== "admin" && role !== "student") {
    return "Field 'role' must be 'admin' or 'student'";
  }

  return null;
}

export function validateLoginUser(username, password) {
  if (!username || !password) {
    return "Fields 'username' and 'password' are required";
  }

  return null;
}