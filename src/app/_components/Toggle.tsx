import { trpc } from "@/utils/trpc"
import React, { useState } from "react"
import Switch from "react-switch"
import Modal from "./Modal"
import useModal from "@/hooks/useModal"

interface ToggleProps {
  isChecked: boolean
  hotelId: number
  channelId: number
}

export default function Toggle({ isChecked, hotelId, channelId }: ToggleProps) {
  const [isToggled, setToggled] = useState(isChecked)
  const { toggle, visible } = useModal()
  const utils = trpc.useUtils()

  const changeHotelChannelVisibility =
    trpc.changeHotelChannelVisibility.useMutation({
      onSuccess: () => {
        utils.getHotelChannels.invalidate()
        setToggled(!isToggled)
      },
      onError: (error) => {
        console.log(error)
        throw new Error("Error changing hotel channel visibility")
      },
    })

  const handleToggle = () => {
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
