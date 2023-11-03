import { trpc } from "@/utils/trpc"
import React, { useEffect, useState } from "react"
import Switch from "react-switch"
import Modal from "./Modal"
import useModal from "@/hooks/useModal"
import { useCloseWithEsc } from "@/hooks/useCloseWithEsc"

interface ToggleProps {
  isChecked: boolean
  hotelId: number
  channelId: number
}

export default function Toggle({ isChecked, hotelId, channelId }: ToggleProps) {
  const [isToggled, setToggled] = useState(isChecked)
  const { toggle, visible } = useModal()

  const getHotelChannels = trpc.getHotelChannels.useQuery(hotelId)
  const changeHotelChannelVisibility =
    trpc.changeHotelChannelVisibility.useMutation({
      onSuccess: () => {
        getHotelChannels.refetch()
      },
      onError: (error) => {
        console.log(error)
      },
    })

  const handleToggle = () => {
    toggle()
    changeHotelChannelVisibility.mutate({
      hotelId: hotelId,
      channelId: channelId,
      visible: isToggled ? 0 : 1,
    })
  }

  return (
    <>
      <label>
        <Switch
          uncheckedIcon={false}
          checkedIcon={false}
          onColor="#0050FF"
          offColor="#CBD5E1"
          onChange={handleToggle}
          checked={isToggled}
        />
      </label>
      <Modal
        visible={visible}
        toggle={toggle}
        title="Are you sure?"
        modalText="This action cannot be undone."
      />
    </>
  )
}
