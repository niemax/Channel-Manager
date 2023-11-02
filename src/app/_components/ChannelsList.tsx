"use client"
import { channels } from "@/db/schema"
import { Channel } from "@/types/general"
import { trpc } from "@/utils/trpc"
import React from "react"
import ChannelRow from "./ChannelRow"

// TODO: fix type
interface ChannelsListProps {
  channels: any
}

export default function ChannelsList({ channels }: ChannelsListProps) {
  return (
    <table
      className="table-auto w-full border-[1px] rounded-xl px-3"
      aria-label="channels_table"
    >
      <thead>
        <tr className="flex flex-row justify-between px-3 py-2 bg-gray-50">
          <th scope="col" className="text-sm font-semibold">
            Channel
          </th>
          <th scope="col" className="text-sm font-semibold">
            Visibility
          </th>
        </tr>
      </thead>
      <tbody className="border-t-[1px]">
        {channels?.map((channel: Channel) => (
          <tr key={channel.id}>
            <td>
              <ChannelRow key={channel.id} channel={channel} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
