import { colors } from "@/theme/foundation"
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

    const defaultValue = options?.[0]

    return [options, defaultValue]
  }, [hotels])

  const handleHotelChange = (hotel: Hotel) => {
    setSelectedHotel(hotel)
  }

  return (
    <div className="w-[275px]">
      {options.length ? (
        <div className="space-y-[4px]">
          <label htmlFor="dropdown" className="font-semibold text-sm">
            Hotel
          </label>
          <Select
            id="dropdown"
            aria-label="Select hotel"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: colors.productBlue,
              },
            })}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                height: 40,
                borderRadius: 10,
                fontSize: "1rem",
              }),
            }}
            options={options}
            defaultValue={defaultValue}
            onChange={(option) => handleHotelChange(option?.value as Hotel)}
          />
        </div>
      ) : null}
    </div>
  )
}
