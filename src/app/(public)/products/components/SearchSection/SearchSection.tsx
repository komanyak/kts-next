'use client';

import Button from '@components/Button';
import Input from '@components/Input';
import MultiDropdown from '@components/MultiDropdown';
import React from 'react';

import styles from './SearchSection.module.scss';

export type SearchSectionProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchClick: () => void;
  selectedFilters: { key: string; value: string }[];
  onFiltersChange: (filters: { key: string; value: string }[]) => void;
  filterOptions: { key: string; value: string }[];
  getFilterTitle: (value: { key: string; value: string }[]) => string;
};

const SearchSection: React.FC<SearchSectionProps> = ({
  searchValue,
  onSearchChange,
  onSearchClick,
  selectedFilters,
  onFiltersChange,
  filterOptions,
  getFilterTitle,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearchClick();
    }
  };

  return (
    <div className={styles.searchSection}>
      <div className={styles.searchRow}>
        <Input
          value={searchValue}
          onChange={onSearchChange}
          onKeyPress={handleKeyPress}
          placeholder="Search product"
          className={styles.searchInput}
        />
        <Button className={styles.searchButton} onClick={onSearchClick}>
          Find now
        </Button>
      </div>
      <MultiDropdown
        options={filterOptions}
        value={selectedFilters}
        onChange={onFiltersChange}
        getTitle={getFilterTitle}
        className={styles.filterDropdown}
      />
    </div>
  );
};

export default SearchSection;
