import React, { useState } from 'react'

import styles from './Pagination.module.css'

const PaginationPage = (props) => {
  const pageHandler = (event) => {
    props.handler(event)
  }

  let paginationIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  return (
    <div className={styles.pagination}>
      {paginationIndex.map((item) => {
        return (
          <button className={styles.btn} key={item} onClick={pageHandler}>
            {item}
          </button>
        )
      })}
    </div>
  )
}
export default PaginationPage
