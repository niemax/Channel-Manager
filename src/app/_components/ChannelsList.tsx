import { HotelChannel } from "@/types/general"
import React from "react"
import ChannelRow from "./ChannelRow"
import Spinner from "./Spinner"

interface ChannelsListProps {
  hotelChannels: HotelChannel[]
  isFetchingMoreHotelChannels: boolean
}

export default function ChannelsList({
  hotelChannels,
  isFetchingMoreHotelChannels,
}: ChannelsListProps) {
  return (
    <>
      <table className="table-auto w-full px-3" aria-label="channels_table">
        <thead>
          <tr className="flex flex-row justify-between px-3 py-2 bg-gray-50 rounded-t-lg border-[1px]">
            <th scope="col" className="text-sm font-semibold">
              Channel
            </th>
            <th scope="col" className="text-sm font-semibold">
              Visibility
            </th>
          </tr>
        </thead>
        <tbody className="border-[1px] rounded-b-lg border-t-0">
          {hotelChannels?.map((hc: HotelChannel) => (
            <tr key={hc.channelName}>
              <td>
                <ChannelRow key={hc.hotelId} hotelChannel={hc} />
              </td>
            </tr>
          ))}
          <tr id="loadMore" />
        </tbody>
      </table>
      {isFetchingMoreHotelChannels && <Spinner />}
    </>
  )
}
