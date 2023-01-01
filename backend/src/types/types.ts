
export interface IUser {
    fullName: string,
    photo: string,
    email: string,
    username: string,
    password: string,
    age: number,
}

export interface ILogin {
    username: string,
    password: string,
}

export interface IRegister {
    name: string,
    email: string,
    telephone: string,
    address: string,
    cpf: string,
}