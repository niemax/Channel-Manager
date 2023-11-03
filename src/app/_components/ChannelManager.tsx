"use client"
import React, { useEffect, useMemo, useState } from "react"
import Dropdown from "./Dropdown"
import { trpc } from "@/utils/trpc"
import { Hotel, HotelChannel } from "@/types/general"
import ChannelsList from "./ChannelsList"
import Spinner from "./Spinner"

export default function ChannelManager() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel>()
  const hotels = trpc.getHotels.useQuery()
  const hotelChannels = trpc.getHotelChannels.useInfiniteQuery(
    { hotelId: selectedHotel?.id as number, limit: 10 },
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
        { threshold: 1 } // trigger callback when any part of the element is visible
      )

      observer.observe(target)
    } else {
      console.log("#loadMore element not found")
    }
  }, [hotelChannels, selectedHotel?.id])

  if (hotels.error)
    return (
      <div>
        <h1>Channel manager</h1>
        <div className="text-red-500">{hotels.error.message}</div>
        <button onClick={() => hotels.refetch()}>Retry</button>
      </div>
    )

  return (
    <div className="space-y-4 px-4 md:px-0">
      <h1>Channel manager</h1>
      <Dropdown
        hotels={new Set(hotels?.data) as Set<Hotel>}
        selectedHotel={selectedHotel as Hotel}
        setSelectedHotel={setSelectedHotel as any}
      />
      {hotelChannels.isFetching && !hotelChannels.data ? (
        <Spinner />
      ) : (
        <ChannelsList
          key={selectedHotel?.id}
          isFetchingMoreHotelChannels={hotelChannels.isFetchingNextPage}
          hotelChannels={
            (hotelChannels?.data?.pages.flatMap(
              (page) => page.data
            ) as HotelChannel[]) ?? []
          }
        />
      )}
    </div>
  )
}
