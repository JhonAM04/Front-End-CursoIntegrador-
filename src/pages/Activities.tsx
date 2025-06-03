import { useEffect, useState } from "react"
import useApi from "../shared/hooks/useApi"
import { activitie, modules, sessionvar } from "../declarations/ApiDeclarations"
import ModuleCard from "../shared/components/ModuleCard"
import ActivitiesCard from "../shared/components/ActivitiesCard"
import { VStack } from "@chakra-ui/react"

const Activities = () => {
  const {getActivities, getModules} = useApi()
  const [actividades, setActividades] = useState<Array<activitie>>()
  const [modulos, setModulos] = useState<Array<modules>>()

  const session: sessionvar = JSON.parse(localStorage.getItem('session')!)

  const getInfo = async() => {
    const response = await getActivities(session.token)
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

              {actividades?.filter(acti => acti.modulo.idModulo == mod.idModulo).map(actividad => (
                <ActivitiesCard key={actividad.idActividad} activ={actividad} />
              ))}

            </ModuleCard>
          ))
        }
      </VStack>
    </>
  )
}

export default Activities