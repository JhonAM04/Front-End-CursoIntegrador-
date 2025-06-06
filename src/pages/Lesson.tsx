import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { sessionvar, lesson } from "../declarations/ApiDeclarations"
import useApi from "../shared/hooks/useApi"
import LessonRender from "../shared/components/LessonRender"

const Lesson = () => {
    const {id} = useParams()
    const {getLesson} = useApi()
    const session: sessionvar = JSON.parse(localStorage.getItem('session')!)
    const [leccion, setLeccion] = useState<lesson>()

    const getInfo = async() => {
        const data = await getLesson(session.token, Number(id))
        setLeccion(data)
    }

    useEffect(()=>{
        getInfo()
    },[])
  return (
    <>
      {
        leccion? <LessonRender less={leccion} /> : 'cargando contenido'
      }
    </>
  )
}

export default Lesson