"use client"
import React, { useEffect, useState } from "react"
import Dropdown from "./Dropdown"
import { trpc } from "@/utils/trpc"
import { Hotel, HotelChannel } from "@/types/general"
import ChannelsList from "./ChannelsList"
import Spinner from "./Spinner"
import SearchField from "./SearchField"
import Error from "./Error"

export default function ChannelManager() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel>()
  const [searchTerm, setSearchTerm] = useState("")

  const hotels = trpc.getHotels.useQuery()
  const hotelChannels = trpc.getHotelChannels.useInfiniteQuery(
    { hotelId: selectedHotel?.id as number },
    {
      getNextPageParam: (lastPage) => lastPage.cursor,
    }
  )

  useEffect(() => {
    if (hotels?.data) {
      const firstHotel = hotels.data[0]
      if (firstHotel) {
        setSelectedHotel(firstHotel as Hotel)
      }
    }
  }, [hotels.data])

  useEffect(() => {
    const target = document.querySelector("#loadMore")

    if (target) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (hotelChannels.hasNextPage) {
              hotelChannels.fetchNextPage()
            }
          }
        },
        { threshold: 1 }
      )

      observer.observe(target)
    } else {
      console.log("#loadMore element not found")
    }
  }, [hotelChannels, selectedHotel?.id])

  if (hotels.error)
    return (
      <Error
        errorMessage={hotels.error.message}
        retryFunction={() => hotels.refetch()}
      />
    )

  return (
    <div className="space-y-5 px-4 md:px-0" data-testid="channel-manager">
      <h1>Channel manager</h1>
      <Dropdown
        hotels={new Set(hotels?.data) as Set<Hotel>}
        setSelectedHotel={setSelectedHotel}
      />
      {hotelChannels.error && (
        <Error
          errorMessage={hotelChannels.error.message}
          retryFunction={() => hotelChannels.refetch()}
        />
      )}
      {hotelChannels.isFetching && !hotelChannels.data ? (
        <Spinner />
      ) : (
        <>
          <SearchField
            hotelName={selectedHotel?.name as string}
            hotelId={selectedHotel?.id as number}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <ChannelsList
            key={selectedHotel?.id}
            isFetchingMoreHotelChannels={hotelChannels.isFetchingNextPage}
            hotelChannels={
              (hotelChannels?.data?.pages.flatMap(
                (page) => page.data
              ) as HotelChannel[]) ?? []
            }
          />
        </>
      )}
    </div>
  )
}
