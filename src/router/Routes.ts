import { lazy } from "react"

export const Elements = {
    Home: lazy(()=> import("../pages/Home")),
    Login: lazy(()=> import("../pages/auth/Login")),
    LoginAdmin: lazy(()=> import("../pages/auth/LoginAdmin")) ,
    Error404: lazy(()=> import("../pages/Error404")),
    ForgotenPassword: lazy(()=> import("../pages/auth/ForgotenPassword")),
    ProfileData: lazy(()=> import("../pages/ProfileData")),
    CrudCuenta: lazy(()=> import("../pages/adminPages/CrudCuenta")),
    CrudPerfil: lazy(()=> import("../pages/adminPages/CrudPerfil")),
    EditarPerfil: lazy(()=> import("../pages/adminPages/EditarPerfil")),
    PagePassword: lazy(()=> import("../pages/auth/PagePassword")),
    Lessons: lazy(()=> import("../pages/Lessons")),
    Activities: lazy(()=> import("../pages/Activities")),
    Activitie: lazy(()=> import("../pages/Activitie")),
    Lesson: lazy(()=> import("../pages/Lesson"))
}

export const Paths = {
    Login: '/',
    LoginAdmin: '/admin',
    ForgotenPassword: '/recuperacion',
    Home : '/home',
    ProfileData: '/profile',
    CrudCuenta: '/crudCuenta',
    CrudPerfil: '/crudPerfil',
    PagePassword: '/changepass',
    Lessons: '/lessons',
    Activities: '/activities'
}