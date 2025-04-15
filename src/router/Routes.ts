import { lazy } from "react"

export const Elements = {
    Home: lazy(()=> import("../pages/Home")),
    Login: lazy(()=> import("../pages/auth/Login")),
    Error404: lazy(()=> import("../pages/Error404")),
    ForgotenPassword: lazy(()=> import("../pages/auth/ForgotenPassword")),
    CrudDocente: lazy(()=> import("../pages/CrudDocente"))

}

export const Paths = {
    Login: '/',
    ForgotenPassword: '/recuperacion',
    Home : '/home',
    CrudDocente: '/cruddocente'

}