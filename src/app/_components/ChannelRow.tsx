import { HotelChannel } from "@/types/general"
import React from "react"
import Toggle from "./Toggle"

interface ChannelRowProps {
  hotelChannel: HotelChannel
}

export default function ChannelRow({ hotelChannel }: ChannelRowProps) {
  return (
    <div className="flex flex-row justify-between items-center border-b-[1px] border-gray-200 px-3 py-2">
      <p>{hotelChannel?.channelName}</p>
      <Toggle
        isChecked={hotelChannel.visible === 0 ? false : true}
        hotelId={hotelChannel.hotelId}
        channelId={hotelChannel.channelId}
        channelName={hotelChannel.channelName}
      />
    </div>
  )
}
