export type sessionvar = {
    id: number
    login : string
    token: string
}

export type account = {
    id: number
    login: string
    password: string
}

type rol = {
    idRol: number
    rol: string
}

export type profile = {
    idPerfil: number
    nombre: string
    apellido: string
    dni: number
    fechanac: Date
    sexo: 'masculino' | 'femenino'
    fotoperfil: string
    rol : rol
    usuario: sessionvar
}