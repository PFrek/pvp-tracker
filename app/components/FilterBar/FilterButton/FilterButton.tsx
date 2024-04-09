'use client';
import style from './FilterButton.module.css';
import clsx from 'clsx';

const FilterButton = ({
  filterType, filterValue, handler, active
}: {
  filterType: string, filterValue: string, handler: Function, active: boolean 
}) => {

  return (
    <button className={clsx(
      style.button,
      active && style.active
    )} name={filterType} onClick={() => handler()}>{filterValue}</button>
  )
}

export default FilterButton