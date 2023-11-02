import React, { useState } from "react"
import Switch from "react-switch"

export default function Toggle() {
  const [isToggled, setToggled] = useState(false)

  const handleToggle = () => setToggled(!isToggled)

  return (
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
  )
}
