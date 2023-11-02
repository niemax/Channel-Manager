"use client"
import React, { useEffect, useState } from "react"
import Dropdown from "./Dropdown"
import { trpc } from "@/utils/trpc"
import { Hotel } from "@/types/general"
import ChannelsList from "./ChannelsList"
import Spinner from "./Spinner"

export default function ChannelManager() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel>()
  const hotels = trpc.getHotels.useQuery()
  const hotelChannels = trpc.getHotelChannels.useQuery(selectedHotel?.id)

  useEffect(() => {
    if (hotels?.data) {
      const firstHotel = hotels.data[0]
      if (firstHotel) {
        setSelectedHotel(firstHotel as Hotel)
      }
    }
  }, [hotels.data])

  if (hotels.error)
    return (
      <div>
        <h1>Channel manager</h1>
        <div className="text-red-500">{hotels.error.message}</div>
        <button onClick={() => hotels.refetch()}>Retry</button>
      </div>
    )

  return (
    <div>
      <div className="space-y-4">
        <h1>Channel manager</h1>
        <Dropdown
          hotels={hotels?.data as Hotel[]}
          selectedHotel={selectedHotel as Hotel}
          setSelectedHotel={setSelectedHotel as any}
        />
        {hotelChannels.isLoading ? (
          <Spinner />
        ) : (
          <ChannelsList channels={hotelChannels?.data} />
        )}
      </div>
    </div>
  )
}
