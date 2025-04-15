export type sessionvar = {
    id: number
    login : string
}

type rol = {
    idRol: number
    rol: string
}

export type profile = {
    apellido: string
    dni: number
    fechanac: Date
    fotoperfil: string
    idDocente: number
    nombre: string
    rol : Array<rol>
    usuario: sessionvar
}