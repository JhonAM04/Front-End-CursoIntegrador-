import { lazy } from "react"

export const Elements = {
    Home: lazy(()=> import("../pages/Home")),
    Login: lazy(()=> import("../pages/auth/Login")),
    Error404: lazy(()=> import("../pages/Error404")),
    ForgotenPassword: lazy(()=> import("../pages/auth/ForgotenPassword")),
    ProfileData: lazy(()=> import("../pages/ProfileData")),
    CrudCuenta: lazy(()=> import("../pages/adminPages/CrudCuenta")),
    CrudPerfil: lazy(()=> import("../pages/adminPages/CrudPerfil")),
    EditarPerfil: lazy(()=> import("../pages/adminPages/EditarPerfil"))

}

export const Paths = {
    Login: '/',
    ForgotenPassword: '/recuperacion',
    Home : '/home',
    ProfileData: '/profile',
    CrudCuenta: '/crudCuenta',
    CrudPerfil: '/crudPerfil'

}