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

export type activitie = {
    idActividad: number
    descripcion: string
    tipo: number
    titulo: string
    modulo: modules
}

export type lesson = {
    idLeccion: number
    titulo: string
    descripcion: string
    leccion: string
    tipo: string
    modulo: modules
}

export type modules = {
    idModulo: number
    descripcion: string
    modulo: string
    orden: number
    idGrado: number
}

export type question = {
    idPregunta: number
    enunciado: string
    orden: number
    respuestaCorrecta: string
    tipoPregunta: string
    actividad: activitie
}

type opciones = {
    textoOpcion: string
    esCorrecta: boolean
}

type preguntas = {
    id: number
    texto: string
    opciones: Array<opciones>
}

export type enunciado = {
    id: number
    enunciado: string
    tipoPregunta: string
    preguntas: Array<preguntas>
}