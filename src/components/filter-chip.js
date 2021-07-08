import React, { useState } from 'react'
import { FaCheck } from "react-icons/fa"

const FilterChip = ({ label, handleFilter }) => {
  const [isSelected, setIsSelected] = useState(false)

  const handleSelect = () => {
    setIsSelected(!isSelected);
    handleFilter({
      operation: isSelected ? 'remove' : 'add',
      value: label,
    });
  }

  return (
    <button className={`tag filter ${isSelected ? 'selected' : ''}`} onClick={handleSelect} onKeyDown={handleSelect}>
      {isSelected && <FaCheck />}
      {' '}
      {label}
    </button>
  )
}

export default FilterChip
