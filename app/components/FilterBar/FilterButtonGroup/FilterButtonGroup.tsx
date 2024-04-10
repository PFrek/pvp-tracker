'use client';
import { MouseEvent, useState } from 'react';
import { IFilterButton } from '../FilterBar';
import FilterButton from '../FilterButton/FilterButton';
import style from './FilterButtonGroup.module.css';
import { useSearchParams } from 'next/navigation';

const FilterButtonGroup = ({ title, buttons, defaultActive }: { title: string, buttons: IFilterButton[], defaultActive: string }) => {
  const [activeButton, setActiveButton] = useState<string>(defaultActive)


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
            filterText={button.text}
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
