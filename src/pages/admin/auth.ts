const ADMIN_PASSWORD = "LSL@2026";
const SESSION_KEY = "lsl_admin_authed";

export function isAdminAuthed(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

export function adminLogin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, "1");
    return true;
  }
  return false;
}

export function adminLogout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export const ADMIN_HINT = ADMIN_PASSWORD;