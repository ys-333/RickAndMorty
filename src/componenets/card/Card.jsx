import React, { useState, useEffect, Suspense } from 'react'
import styles from './Card.module.css'
const CharacterLocation = React.lazy(() => import('./CharacterLocation'))
const PaginationPage = React.lazy(() => import('../Pagination/Pagination'))
const CharacterEpisode = React.lazy(() => import('./CharacterEpisode'))
import useFetch from '../../hooks/useFetch'

const Card = () => {
  let count = 0
  let countEpisode = 0

  // fetching data from custom hook, which have all the logic from getting character name to the number of episode they have worked in.
  const { data, locData, episodeName, fetchData, fetchEpisode } = useFetch()

  // for fetching data for next page, as this function get trigggerd when we try to access another page
  const pageHandler = (event) => {
    fetchData(event.target.innerHTML)
  }

  useEffect(() => {
    fetchData(1)
    fetchEpisode(1)
    fetchEpisode(2)
    fetchEpisode(3)
  }, [fetchData])

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <PaginationPage handler={pageHandler} />
      </Suspense>
      <div className={styles.app}>
        {data.length > 0 &&
          locData.length > 0 &&
          episodeName.length > 0 &&
          data.map((item) => {
            return (
              <div className={styles.card} key={item.id}>
                <div className={styles.card_heading}>
                  <h1>{item.name}</h1>
                  <h4>
                    {item.species}
                    {` (${item.gender})`}
                  </h4>
                  {/* <h5>{item.gender}</h5> */}
                </div>
                <div className={styles.card_body}>
                  <div className={styles.card_image}>
                    <img loading="lazyload" src={item.image} alt={item.name} />
                  </div>
                  {/* character location */}
                  <Suspense fallback={<p>Loading...</p>}>
                    <CharacterLocation
                      location={locData}
                      index={count++}
                      originName={item.origin.name}
                      locationName={item.location.name}
                    />
                  </Suspense>

                  <div>
                    <Suspense fallback={<p>Loading...</p>}>
                      <CharacterEpisode
                        episodeName={episodeName}
                        index={countEpisode++}
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default Card
