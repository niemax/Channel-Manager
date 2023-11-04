import { Hotel } from "@/types/general"
import React, { Dispatch, SetStateAction, useMemo } from "react"
import Select from "react-select"

interface DropdownProps {
  hotels: Set<Hotel>
  setSelectedHotel: Dispatch<SetStateAction<Hotel | undefined>>
}

export default function Dropdown({ hotels, setSelectedHotel }: DropdownProps) {
  const [options, defaultValue] = useMemo(() => {
    const options =
      [...hotels].map((hotel) => ({
        value: hotel,
        label: hotel.name,
      })) ?? []

    const defaultValue = options?.find((option) => option.label === "Hotel A")

    return [options, defaultValue]
  }, [hotels])

  const handleHotelChange = (hotel: Hotel) => {
    setSelectedHotel(hotel)
  }

  return (
    <div className="w-[275px]">
      {options.length ? (
        <Select
          options={options}
          defaultValue={defaultValue}
          onChange={(option) => handleHotelChange(option?.value as Hotel)}
        />
      ) : null}
    </div>
  )
}
