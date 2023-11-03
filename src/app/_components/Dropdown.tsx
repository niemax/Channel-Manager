import { Hotel } from "@/types/general"
import React, { Dispatch, SetStateAction, memo, useState } from "react"

const UpChevron = () => {
  return (
    <svg
      className="-mr-1 ml-2 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const DownChevron = () => {
  return (
    <svg
      className="-mr-1 ml-2 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  )
}

interface DropdownProps {
  hotels: Set<Hotel>
  selectedHotel: Hotel
  setSelectedHotel: Dispatch<SetStateAction<Hotel>>
}

export default function Dropdown({
  hotels,
  selectedHotel,
  setSelectedHotel,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  function renderChevron() {
    if (isOpen) {
      return <UpChevron />
    } else {
      return <DownChevron />
    }
  }

  function handleHotelChange(hotel: Hotel) {
    setSelectedHotel(hotel)
    setIsOpen(false)
  }

  return (
    <div className="w-[275px]">
      <label className="font-medium">Hotel</label>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-row justify-between items-center w-full h-auto rounded-xl border border-gray-300 shadow-sm px-2 py-1 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-productBlue"
        >
          {selectedHotel?.name}
          {renderChevron()}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-[275px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {[...hotels]?.map((hotel: Hotel) => (
              <a
                key={hotel.id}
                href="#"
                className="block px-4 py-2 text-sm text-alternativeFontLight hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleHotelChange(hotel)}
              >
                {hotel.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
