import { Slider } from '@mui/material'
import { useState } from 'react'

interface ThrottleSLiderProps {
  min?: number
  max?: number
  numBars: number
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}

export default function ThrottleSlider({
  min = 10,
  max = 100,
  numBars = 8,
  value,
  setValue
}: ThrottleSLiderProps): JSX.Element {
  return (
    <div className="flex gap-4 rounded-lg py-2 bg-gray-500 h-full relative">
      <div className="shadow-2xl rounded-lg">
        {Array.from({ length: numBars }, (_, index) => (
          <div
            key={index}
            className="border-x-4 border-y-4 border-gray-500 bg-gray-500 shadow-inner"
          >
            <div
              className="w-16 h-6 shadow-inner rounded-sm transition-all"
              style={{
                backgroundColor:
                  (1 - value / (max - min)) * numBars >= index
                    ? 'gray'
                    : index + 1 <= numBars / 4
                      ? 'red'
                      : index + 1 <= numBars / 2
                        ? 'orange'
                        : index + 1 <= numBars / 1.25
                          ? 'yellow'
                          : 'lime'
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className="py-2">
        <Slider
          aria-label="throttle"
          orientation="vertical"
          valueLabelDisplay="auto"
          value={value}
          onChange={(_event, val) => typeof val === 'number' && setValue(val)}
          min={min}
          max={max}
          sx={{ color: '#4f5359' }}
        />
      </div>
    </div>
  )
}
