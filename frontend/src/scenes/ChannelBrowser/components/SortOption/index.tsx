import React from 'react';
import styles from './styles.module.sass';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { SortType } from 'common/enums/SortType';
import { ISortOptions } from 'common/models/sorting/ISortOptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faCheck } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  setSortOption: (option: SortType) => void;
  sortOption: SortType;
}

export const SortOption: React.FC<IProps> = ({ setSortOption, sortOption }) => {
  const sortOptions: ISortOptions = {
    [SortType.Newest]: 'Newest channel',
    [SortType.Oldest]: 'Oldest channel',
    [SortType.Most]: 'Most members',
    [SortType.Fewest]: 'Fewest members',
    [SortType.AToZ]: 'A to Z',
    [SortType.ZToA]: 'Z to A'
  };

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortOption(event.currentTarget.id as SortType);
    document.body.click();
  };

  const popover = (
    <Popover id="sort-popup" className={styles.popOverOptions}>
      {
        Object.keys(sortOptions).map(key => (
          <button
            id={key}
            key={key}
            className={styles.optionsSelect}
            onClick={onClickHandler}
            type="button"
          >
            <span className={styles.option}>{sortOptions[key]}</span>
            {key === sortOption && <FontAwesomeIcon icon={faCheck} size="sm" />}
          </button>
        ))
      }
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
      <button type="button" className={`${styles.sortBtn} button-unstyled`}>
        <FontAwesomeIcon icon={faSort} size="lg" />
        <span>{`Sort: ${sortOptions[sortOption]}`}</span>
      </button>
    </OverlayTrigger>
  );
};

