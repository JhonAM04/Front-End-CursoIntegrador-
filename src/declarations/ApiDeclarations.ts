export type sessionvar = {
    id: number
    login : string
    token: string
}

type rol = {
    idRol: number
    rol: string
}

export type profile = {
    nombre: string
    apellido: string
    dni: number
    fechanac: Date
    sexo: 'masculino' | 'femenino'
    fotoperfil: string
    idDocente: number
    rol : Array<rol>
    usuario: sessionvar
}