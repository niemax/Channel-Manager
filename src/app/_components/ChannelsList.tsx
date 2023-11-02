"use client"
import { trpc } from "@/utils/trpc"
import React from "react"

export default function ChannelsList() {
  const getChannels = trpc.getChannels.useQuery()

  if (getChannels.status === "loading") return <div>Loading...</div>
  if (getChannels.status === "error")
    return <div>Error: {getChannels.error.message}</div>
  return <div>ChannelsList</div>
}
