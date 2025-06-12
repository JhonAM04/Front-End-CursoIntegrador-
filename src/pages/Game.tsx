import { useEffect, useState } from "react"
import useApi from "../shared/hooks/useApi"
import { games, sessionvar } from "../declarations/ApiDeclarations"
import { useParams } from "react-router-dom"
import { VStack } from "@chakra-ui/react"


const Game = () => {
    const {id} = useParams()
    const [game, setGame] = useState<games>()
    const {getGame} = useApi()
    const session: sessionvar = JSON.parse(localStorage.getItem('session')!)

    const getInfo = async() => {
        const data = await getGame(session.token, Number(id) )
        setGame(data)
    }

    useEffect(()=>{
      getInfo()
    },[])
  return (
    <VStack justifyContent='center' alignItems='center' w='100%' h='100vh'>
      <iframe src={game?.url} width='1000' height='800' allowFullScreen />
    </VStack>
  )
}

export default Game