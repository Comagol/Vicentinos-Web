//Seteo las opciones de la cookie de autenticacion
export const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000,
};

//Funcion para setear la cookie de autenticacion
export function setAuthCookie(res, token) {
  res.cookie("authToken", token, authCookieOptions);
};
