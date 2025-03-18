import { Switch } from '@/components/ui/switch'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const ActiveToggle = ({active, onToggle,changingStatus,disabled}:{active:boolean, onToggle: (checked: boolean) => void,changingStatus:boolean,disabled:boolean}) => {
  return (
    <div className = "">
      {
        changingStatus ? (
          <Icon icon="mdi:loading" className="animate-spin  text-2xl text-gray-500"  />
        ) : (
          <Switch 
            checked={active} 
            onCheckedChange={(checked) => onToggle(checked)} 
            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300" 
            disabled = {disabled}
          />
        )
      }
    </div>
  )
}

export default ActiveToggle
