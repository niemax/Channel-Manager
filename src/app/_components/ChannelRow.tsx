import { Channel } from "@/types/general"
import React from "react"
import Toggle from "./Toggle"

interface ChannelRowProps {
  channel: Channel
}

export default function ChannelRow({ channel }: ChannelRowProps) {
  return (
    <div className="flex flex-row justify-between items-center border-b-[1px] border-gray-200 px-3 py-2">
      <p>{channel?.name}</p>
      <Toggle />
    </div>
  )
}
