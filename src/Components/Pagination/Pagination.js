import { Pagination } from 'antd'
import { useEffect, useState } from 'react'

import { MovieAPI } from '../../API/MovieAPI'

import Style from './Pagination.module.css'

const PaginationJS = (props) => {
  const [current, setCurrent] = useState(1)
  const [search, setSearch] = useState(props.inputSearch)

  useEffect(() => {
    setSearch(props.inputSearch)
    setCurrent(1)
  }, [props.inputSearch])
  const onChange = async (page) => {
    setCurrent(page)
    if (props.inputSearch !== '') {
      let res = await MovieAPI.Search(search, page)
      props.setMovie(res)
    } else {
      let res = await MovieAPI.Popular(page)
      props.setMovie(res)
    }
  }
  return (
    <div className={Style.pagination}>
      <Pagination current={current} onChange={onChange} total={props.totalPages} />
    </div>
  )
}

export default PaginationJS
