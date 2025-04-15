import { useEffect } from "react"
import useApi from "../shared/hooks/useApi"

const CrudDocente = () => {

    const { getDocentes } = useApi()

    useEffect(()=>{
        const docentes = async() => {
            await getDocentes()
        }

        docentes()
    },[])



  return (
    <div>CrudDocente</div>
  )
}

export default CrudDocente