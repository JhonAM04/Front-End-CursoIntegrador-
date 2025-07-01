import { useEffect, useState } from "react"
import useApi from "../shared/hooks/useApi"
import { avanceActividad, modules, profile, sessionvar } from "../declarations/ApiDeclarations"
import ModuleCard from "../shared/components/ModuleCard"
import ActivitiesCard from "../shared/components/ActivitiesCard"
import { VStack } from "@chakra-ui/react"

const Activities = () => {
  const { getModules, avancePerfilActividad} = useApi()
  const [actividades, setActividades] = useState<Array<avanceActividad>>()
  const [modulos, setModulos] = useState<Array<modules>>()

  const session: sessionvar = JSON.parse(localStorage.getItem('session')!)
  const perfil: profile = JSON.parse(localStorage.getItem('perfil')!)

  const getInfo = async() => {
    const response = await avancePerfilActividad(session.token, perfil.idPerfil)
    setActividades(response)
    const response2 = await getModules(session.token)
    setModulos(response2)
  }

  useEffect(()=>{
    getInfo()
  },[])
  return (
    <>
      <VStack gap='2em'>
        {
          modulos?.map(mod => (
            <ModuleCard key={mod.idModulo} modulo={mod} >

              {actividades?.filter(acti => acti?.actividad?.modulo?.idModulo == mod.idModulo).map(actividad => (
                <ActivitiesCard key={actividad?.actividad?.idActividad} activ={actividad} token={session.token} />
              ))}

            </ModuleCard>
          ))
        }
      </VStack>
    </>
  )
}

export default Activities