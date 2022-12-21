import React from 'react'
import styles from './CharacterLocation.module.css'

const CharacterLocation = (props) => {
  const { index } = props
  return (
    <div className={styles.character_location}>
      <span className={styles.location_heading}>location </span>
      <section className={styles.location_details__1}>
        <span className={styles.origin}>
          {props.originName === 'unknown' ? 'Earth(C-137)' : props.originName}
        </span>
        <span className={styles.location_name}>{props.locationName}</span>
      </section>
      <section className={styles.location_details__2}>
        <span className={styles.origin_name}>{props.location[index].name}</span>
        <span className={styles.dimension}>
          {props.location[index].dimension}
        </span>
        <p>
          Residents:{' '}
          <span className={styles.residents}>
            {props.location[index].residents}
          </span>
        </p>
      </section>
    </div>
  )
}

export default CharacterLocation
