export type Hotel = {
  id: number
  name: string
}

export type Channel = {
  id: number
  name: string
}

export type HotelChannel = {
  hotelId: number
  channelId: number
  visible: number
}
