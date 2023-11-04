import useDebounce from "@/hooks/useDebounce"
import { trpc } from "@/utils/trpc"
import React, { ChangeEvent, Dispatch } from "react"
import Spinner from "./Spinner"

interface SearchFieldProps {
  hotelName: string
  hotelId: number
  searchTerm: string
  setSearchTerm: Dispatch<string>
}

export default function SearchField({
  hotelName,
  hotelId,
  searchTerm,
  setSearchTerm,
}: SearchFieldProps) {
  const hotelVisibility = trpc.checkVisibilityOfHotelOnChannel.useQuery(
    {
      hotelId: hotelId,
      channelName: searchTerm,
    },
    {
      enabled: false,
    }
  )

  const debouncedRequest = useDebounce(() => {
    hotelVisibility.refetch()
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    value.length > 0 && debouncedRequest()
  }

  const hotelIsVisible = hotelVisibility.data?.[0]?.visible === 1

  return (
    <div className="flex flex-col space-y-1 py-1">
      <label className="text-sm font-medium">
        Query for {hotelName} visibility on channel
      </label>
      <input
        className="border border-grayDark rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-productBlue focus:border-transparent"
        type="text"
        placeholder="Enter the name of channel"
        value={searchTerm}
        onChange={onChange}
      />
      {hotelVisibility.isFetching ? <Spinner /> : null}
      {hotelVisibility.data?.length ? (
        <p
          className={`text-sm font-medium ${
            hotelIsVisible ? "text-green-500" : "text-red-300"
          }`}
        >
          {hotelVisibility.data?.[0]?.visible === 1 ? "visible" : "not visible"}
        </p>
      ) : null}
    </div>
  )
}
