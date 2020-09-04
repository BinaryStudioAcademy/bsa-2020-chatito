import React from 'react';
import styles from './styles.module.sass';
import { OverlayTrigger, Popover, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FilterType } from 'common/enums/FilterType';

interface IProps {
  filterOption: string;
  setFilterOption: (option: FilterType) => void;
  setIsChecked: () => void;
  isChecked: boolean;
}

export const FilterOption: React.FC<IProps> = ({ filterOption, setFilterOption, isChecked, setIsChecked }) => {
  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setFilterOption(value as FilterType);
  };

  const onCheckboxChange = () => {
    setIsChecked();
  };

  const onClickHandler = () => {
    document.body.click();
  };

  const popover = (
    <Popover id="filter-popup" className={styles.popup}>
      <FontAwesomeIcon icon={faTimes} className={styles.closeBtn} onClick={onClickHandler} />
      <div className={styles.label}>Channel type</div>
      <Form.Control as="select" size="sm" className={styles.select} value={filterOption} onChange={onSelectChange}>
        <option value={FilterType.All}>All channel types</option>
        <option value={FilterType.Private}>Private channels</option>
      </Form.Control>
      <div className={styles.label}>More options</div>
      <Form.Check
        className={styles.checkbox}
        type="checkbox"
        label="Hide my channels"
        checked={isChecked}
        onChange={onCheckboxChange}
      />
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
