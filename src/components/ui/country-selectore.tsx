import  { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

type CountrySelectorProps = {
    onSelect: (code:string, name:string) => void
}


function CountrySelector({onSelect}: CountrySelectorProps) {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData() as unknown as string[], [])

  const changeHandler = (value:unknown) => {
    setValue(value as string);
    onSelect(countryList().getLabel(value as string), value as string)
  }

  return <Select options={options} value={value} onChange={changeHandler} />
}

export default CountrySelector