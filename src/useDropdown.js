import React, { useState } from 'react'

const useDropdown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState)
  const id = `use-dropdown-${label.replace(' ', '').toLowerCase()}`
  const DropDown = () => (
    <label htmlFor={id}>
      {label}
      <select
        id={label}
        onChange={e => setState(e.target.value)}
        onBlur={e => setState(e.target.value)}
        value={state}
        disabled={options.length === 0}
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  )
  return [state, DropDown, setState]
}

export default useDropdown