import React from 'react'
import styles from './CharacterEpisode.module.css'

const CharacterEpisode = (props) => {
  return (
    <React.Fragment>
      <h6 className={styles.episode_heading}>Episode Name:</h6>
      <div className={styles.episodeName_container}>
        {props.episodeName[props.index].map((item) => {
          return (
            <span
              className={styles.episode_name}
              key={Math.floor(Math.random() * 8)}
            >
              {item}
            </span>
          )
        })}
      </div>
    </React.Fragment>
  )
}

export default CharacterEpisode
