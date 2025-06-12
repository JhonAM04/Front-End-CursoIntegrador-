import { useEffect, useState } from "react"
import { games, sessionvar } from "../declarations/ApiDeclarations"
import useApi from "../shared/hooks/useApi"
import GamesCard from "../shared/components/GamesCard"
import { SimpleGrid } from "@chakra-ui/react"


const Games = () => {
    const [games, setGames] = useState<Array<games>>()
    const {getGames} = useApi()
    const session: sessionvar = JSON.parse(localStorage.getItem('session')!)

    const getInfo = async() => {
        const data = await getGames(session.token)
        setGames(data)
        console.log(data)
    }
    
    useEffect(()=>{
        getInfo()
    },[])
  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6} w="100%"  justifyContent="center">
        {
          games?.map(game => (
            <GamesCard juegos={game} key={game.idGames} />
          ))
        }
      </SimpleGrid>
    </>
  )
}

export default Games