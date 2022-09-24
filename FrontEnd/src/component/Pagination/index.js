import React, { useEffect } from 'react'

export default function Pagination(props) {
  const { totalTask, tasksPerPage, paginate } = props;
  
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalTask/tasksPerPage); i++){
    pageNumber.push(i)
  }
  
  return (
    <div className="pagination flex items-center justify-center">
      {pageNumber.map(number => {
        return <button key={number} onClick={() => { paginate(number) }} className="mx-1 px-2 text-cyan-800 rounded-full border-2 bg-violet-400">{number}</button>
      })}
         
    </div>
  )
}
