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
    img: string
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

export type speaking  = {
    idSpeaking: number
    img: string
    respuesta: string
}

export type games = {
    idGames: number
    descripcion: string
    img: string
    titulo: string
    url: string
}

export type avanceActividad = {
    id: number
    perfil: profile
    actividad: activitie
    completado: boolean
}