import { useState, useCallback, useEffect } from 'react'

let episodeArray = []
let episodeName = []

const useFetch = () => {
  const [data, setData] = useState([])
  const [location, setLocation] = useState([])
  const [locData, setLocData] = useState([])
  const [totalEpisode, setTotalEpisode] = useState([])

  // for fetching data from of all characters.
  const fetchData = useCallback(async (page) => {
    const responseData = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`,
    )

    const resData = await responseData.json()

    setData(resData.results)

    // setLocation(resData.results.map((item) => item.location.url))

    const locationData = resData.results.map((item) => {
      // if any avatar or item is missing url, so we are giving backup:
      if (item.location.url === '') {
        return 'https://rickandmortyapi.com/api/location/3'
      } else {
        return item.location.url
      }
    })
    setLocation(locationData)
  }, [])

  // logic related to episode name in which character

  function searchEpisodeName(episode, index) {
    let name
    let idx = parseInt(episode.substring(episode.lastIndexOf('/') + 1))
    episodeArray.map((item) => {
      if (item.id === idx) {
        // console.log(item.name, index)
        name = item.name
      }
    })
    return name
  }

  /*
      In this function we put all all episode character worked in and we limit the number of episode
      he/she worked in by totalNumber of episode/10, so we don't end up displaying all the episode in the card.
  */

  function episode() {
    let characterEpisode = []

    let episodeNameOfEachCharacter = []

    data.map((item) => {
      characterEpisode.push(item.episode)
    })

    characterEpisode.forEach((item, index) => {
      let totalIndex = parseInt(item.length / 10)
      let n = totalIndex === 0 ? 1 : totalIndex
      let array = []
      for (let i = 0; i < n; i++) {
        let name = searchEpisodeName(item[i], index)
        array.push(name)
      }
      episodeNameOfEachCharacter[index] = array
    })
    episodeName = episodeNameOfEachCharacter
  }

  async function fetchLocation(urls) {
    let locationArray = []

    for (let url of urls) {
      const response = await fetch(url)
      const responseData = await response.json()
      if (responseData) {
        locationArray.push({
          name: responseData.name,
          dimension:
            responseData.dimension === 'unknown'
              ? 'Dimension C-53'
              : responseData.dimension,
          residents: responseData.residents.length,
        })
      }
    }
    setLocData(locationArray)
  }

  const fetchEpisode = useCallback(async (page) => {
    const episodeResposne = await fetch(
      `https://rickandmortyapi.com/api/episode?page=${page}`,
    )
    const episodeData = await episodeResposne.json()
    // console.log(episodeData.results)
    setTotalEpisode([...totalEpisode, ...episodeData.results])
    if (episodeArray.length !== 51) {
      episodeArray.push(...episodeData.results)
    }
  }, [])

  useEffect(() => {
    episode()
  }, [data])

  useEffect(() => {
    fetchLocation(location)
  }, [location])

  return {
    data,
    locData,
    episodeArray,
    fetchEpisode,
    fetchData,
    episodeName,
  }
}

export default useFetch
