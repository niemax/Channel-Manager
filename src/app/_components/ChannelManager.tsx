"use client"
import React, { useEffect, useState } from "react"
import Dropdown from "./Dropdown"
import { trpc } from "@/utils/trpc"
import { Hotel } from "@/types/general"

export default function ChannelManager() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel>()
  const hotels = trpc.getHotels.useQuery()
  const hotelChannels = trpc.getHotelChannels.useQuery(
    selectedHotel?.id as number
  )

  useEffect(() => {
    if (hotels?.data) {
      setSelectedHotel(hotels?.data[0])
    }
  }, [])

  useEffect(() => {
    console.log(selectedHotel)
    console.log(hotelChannels?.data)
  }, [selectedHotel])

  if (hotels.status === "loading") return <div>Loading...</div>

  if (hotels.status === "error") return <div>Error: {hotels.error.message}</div>

  return (
    <div>
      <div className="space-y-4">
        <h1>Channel manager</h1>
        <Dropdown
          hotels={hotels?.data as Hotel[]}
          selectedHotel={selectedHotel as Hotel}
          setSelectedHotel={setSelectedHotel}
        />
        <p>List of hotel channels here</p>
      </div>
    </div>
  )
}
