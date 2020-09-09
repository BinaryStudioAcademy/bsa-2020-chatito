import React from 'react';
import styles from './styles.module.sass';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FilterType } from 'common/enums/FilterType';
import { IFilterOptions } from 'common/models/filtering/IFilterOptions';
import { IFilterFunctions } from 'common/models/filtering/IFilterFuncions';

interface IProps {
  filterOption: string;
  setFilterOption: (option: FilterType) => void;
  setIsChecked: () => void;
  isChecked: boolean;
}

export const FilterOption: React.FC<IProps> = ({ filterOption, setFilterOption, isChecked, setIsChecked }) => {
  const onSelectChange = (value: string) => {
    setFilterOption(value as FilterType);
  };

  const onCheckboxChange = () => {
    setIsChecked();
  };

  const filterOptions: IFilterOptions = {
    [FilterType.All]: 'All channel types',
    [FilterType.Private]: 'Private channels',
    [FilterType.HideMy]: 'Hide my channels'
  };

  const filterFunctions: IFilterFunctions = {
    [FilterType.All]: () => onSelectChange(FilterType.All),
    [FilterType.Private]: () => onSelectChange(FilterType.Private),
    [FilterType.HideMy]: onCheckboxChange
  };

  const popover = (
    <Popover id="filter-popup" className={styles.popOverOptions}>
      {
        Object.keys(filterOptions).map(key => (
          <button
            id={key}
            key={key}
            className={styles.optionsSelect}
            onClick={filterFunctions[key]}
            type="button"
          >
            <span className={styles.option}>{filterOptions[key]}</span>
            {key === filterOption && <FontAwesomeIcon icon={faCheck} size="sm" />}
            {isChecked && key === FilterType.HideMy && <FontAwesomeIcon icon={faCheck} size="sm" />}
          </button>
        ))
      }
    </Popover>

  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
      <button type="button" className={`${styles.filterBtn} button-unstyled`}>
        <FontAwesomeIcon icon={faFilter} />
        <span>Filter</span>
      </button>
    </OverlayTrigger>
  );
};
