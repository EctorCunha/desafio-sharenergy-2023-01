export const TOKEN_KEY = 'token';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const NOME_USUARIO = 'nome_usuario';

export const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => {localStorage.clear()}

export const nomeUsuario = (nome: string) => {
    localStorage.setItem(NOME_USUARIO, nome);
}
