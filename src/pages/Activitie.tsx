import { useParams } from "react-router-dom"
import WritingTemplate from "../shared/components/WritingTemplate"
import SpeakingTemplate from "../shared/components/SpeakingTemplate"
import useApi from "../shared/hooks/useApi"
import { useEffect, useState } from "react"
import { activitie, enunciado, question, sessionvar } from "../declarations/ApiDeclarations"
import ReadingTemplate from "../shared/components/ReadingTemplate"

// Tipo extendido con las nuevas propiedades
type questionExtended = question & {
  sentenceParts: (string | null)[]
  correctAnswers: string[]
}

const Activitie = () => {
  const { getActivitie, getQuestion, getEnunciado } = useApi()
  const { id } = useParams()
  const idActivitie = Number(id)

  const session: sessionvar = JSON.parse(localStorage.getItem("session")!)

  const [activitie, setActivitie] = useState<activitie>()
  const [questions, setQuestions] = useState<questionExtended[]>()
  const [enunciado, setEnunciado] = useState<enunciado>()

  // Función para separar el enunciado en partes con null donde hay espacios
  const formatSentence = (sentence: string): (string | null)[] => {
    const parts = sentence.split(/_{2,}/g) // divide por "__"
    const matches = sentence.match(/_{2,}/g) // cuenta los espacios
    const result: (string | null)[] = []

    for (let i = 0; i < parts.length; i++) {
      result.push(parts[i]);
      if (matches && i < matches.length) result.push(null); // inserta null donde hay "__"
    }

    return result
  }

  const getInfo = async () => {
    const data = await getActivitie(session.token, idActivitie)
    setActivitie(data)

    if(data.tipo == 2){
      const data2: question[] = await getQuestion(session.token, idActivitie)

      // Transformamos cada pregunta para agregar sentenceParts y correctAnswers
      if (data2){
        const transformed: questionExtended[] = data2.map((q) => ({
        ...q,
        sentenceParts: formatSentence(q.enunciado),
        correctAnswers: q.respuestaCorrecta.split(","),
      }))
      setQuestions(transformed)
      }
      return
    }
    if(data.tipo == 1){
      const data3 = await getEnunciado(session.token, idActivitie)
      setEnunciado(data3)
      return
    }

  }

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <>
      {activitie?.tipo === 2 &&
        questions?.map((q, index) => (
          <WritingTemplate
            key={index}
            sentenceParts={q.sentenceParts}
            correctAnswers={q.correctAnswers}
          />
        ))}

      {activitie?.tipo === 1 && <ReadingTemplate enun={enunciado!} />}
      {activitie?.tipo === 3 && <SpeakingTemplate />}
    </>
  )
}

export default Activitie
