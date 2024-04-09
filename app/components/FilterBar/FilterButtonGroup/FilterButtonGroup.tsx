'use client';
import { MouseEvent, useState } from 'react';
import { IFilterButton } from '../FilterBar';
import FilterButton from '../FilterButton/FilterButton';
import style from './FilterButtonGroup.module.css';
import { useSearchParams } from 'next/navigation';

const FilterButtonGroup = ({ title, buttons }: { title: string, buttons: IFilterButton[] }) => {
  const [activeButton, setActiveButton] = useState<string>('')


  return (
    <div className={style.container}>
      <h3>{title}</h3>
      {buttons.map((button) => {
        return (
          <FilterButton
            active={activeButton === button.value}
            key={button.value}
            filterType={button.type}
            filterValue={button.value}
            handler={() => {
              setActiveButton(button.value);
              button.handler(button.type, button.value);
            }}
          />
        )
      })}
    </div>
  )
}

export default FilterButtonGroup