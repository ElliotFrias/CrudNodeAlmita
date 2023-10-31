import React, { useState } from 'react'

function GeneraInput({ type, onChangeHandler, name, id, className, max, value }) {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event) => {
    const newValue = event.target.value

    if (newValue.length <= max) {
      setInputValue(newValue)
    }
  }

  return (
    <input
      className={className}
      type={type}
      onChange={onChangeHandler}
      name={name}
      id={id}
      maxLength={max}
      value = {inputValue || value}
      required
    />
  )
}

export default GeneraInput
