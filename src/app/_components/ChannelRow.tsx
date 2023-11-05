import { HotelChannel } from "@/types/general"
import React from "react"
import Toggle from "./Toggle"

interface ChannelRowProps {
  hotelChannel: HotelChannel
}

export default function ChannelRow({ hotelChannel }: ChannelRowProps) {
  return (
    <div className="flex flex-row justify-between items-center border-b-[1px] border-gray-200 dark:border-neutral-700 px-4 py-2">
      <p className="text-slate-700 dark:text-white">
        {hotelChannel?.channelName}
      </p>
      <Toggle
        isChecked={hotelChannel.visible === 0 ? false : true}
        hotelId={hotelChannel.hotelId}
        channelId={hotelChannel.channelId}
        channelName={hotelChannel.channelName}
      />
    </div>
  )
}
