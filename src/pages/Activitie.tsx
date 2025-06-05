import { useParams } from "react-router-dom"
import WritingTemplate from "../shared/components/WritingTemplate"
import useApi from "../shared/hooks/useApi"
import { useEffect, useState } from "react"
import { activitie, sessionvar } from "../declarations/ApiDeclarations"
import SpeakingTemplate from "../shared/components/SpeakingTemplate"


const Activitie = () => {
  const {getActivitie} = useApi()
  const {id} = useParams()
  const idActivitie = Number(id)
  const session: sessionvar = JSON.parse(localStorage.getItem('session')!)
  const [activitie, setActivitie] = useState<activitie>()
  
  const getInfo = async() => {
    const data = await getActivitie(session.token, idActivitie)
    setActivitie(data)
  }

  useEffect(()=>{
    getInfo()
  },[])
  
  return (
    <>
    {
      activitie?.tipo == 1 &&
      <WritingTemplate correctAnswers={['Jhon', 'Play']} sentenceParts={['I am', null, 'and i',null]} />
    }
    {
      activitie?.tipo == 2 &&
      <SpeakingTemplate />
    }
    </>
  )
}

export default Activitie