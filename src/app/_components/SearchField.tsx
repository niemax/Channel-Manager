import useDebounce from "@/hooks/useDebounce"
import { trpc } from "@/utils/trpc"
import React, { ChangeEvent, Dispatch } from "react"

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

    value.length > 2 && debouncedRequest()
  }

  const renderResultText = () => {
    return hotelVisibility.isFetched &&
      !hotelVisibility.data?.length &&
      searchTerm.length > 0 ? (
      <p className="text-lg font-medium text-red-600">Not found</p>
    ) : hotelVisibility.data?.length ? (
      <p
        className={`text-lg font-medium ${
          hotelIsVisible ? "text-green-500" : "text-red-600"
        }`}
      >
        {hotelVisibility.data?.[0]?.visible === 1 ? "Visible" : "Not visible"}
      </p>
    ) : null
  }

  const hotelIsVisible = hotelVisibility.data?.[0]?.visible === 1

  return (
    <div className="flex flex-col space-y-1 py-1">
      <label className="text-sm font-medium">
        Query for {hotelName} visibility on channel
      </label>
      <input
        className={`border ${
          !hotelVisibility?.data?.length && hotelVisibility.isFetching
            ? "focus:outline-none focus:ring-4 focus:ring-yellow-600 focus:border-transparent animate-pulse border-yellow-600"
            : "border-darkGray dark:border-neutral-700 bg-white dark:bg-alternativeBlack"
        } ${
          hotelVisibility.error ? "focus:ring-red-500" : ""
        } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-productBlue focus:border-transparent`}
        type="text"
        placeholder="Enter the name of channel"
        value={searchTerm}
        onChange={onChange}
      />
      {}
      {hotelVisibility.error && (
        <span className="text-red-500">{hotelVisibility.error.message}</span>
      )}
      {renderResultText()}
    </div>
  )
}
