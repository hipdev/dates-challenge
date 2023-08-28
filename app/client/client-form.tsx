'use client'

import { FormEvent, useEffect, useState } from 'react'
import Dates from './dates'

export type DateItem = {
  client: string
  checkIn: string
  checkOut: string
}

export default function ClientForm() {
  const [dates, setDates] = useState<DateItem[]>([])

  useEffect(() => {
    const localDates = localStorage.getItem('dates')
    if (localDates) {
      setDates(JSON.parse(localDates))
    }
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const client = form.client.value
    const checkIn = form.checkIn.value
    const checkOut = form.checkOut.value

    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

    if (new Date(checkIn) < yesterday) {
      alert('Check-in date must be in the future')
      return
    }

    if (checkIn > checkOut) {
      alert('Check-in date must be before check-out date')
      return
    }

    if (client && checkIn && checkOut) {
      const newDates = [...dates, { client, checkIn, checkOut }]
      setDates(newDates)
      localStorage.setItem('dates', JSON.stringify(newDates))
      form.reset()
    }
  }

  return (
    <>
      <div className='flex mt-20 flex-col items-center bg-black/80 max-w-3xl w-full px-6 pt-4 rounded-md shadow-lg pb-8 text-center'>
        <h3 className='text-2xl mb-5 font-semibold text-white/90'>
          New client
        </h3>
        <form onSubmit={handleSubmit} className='flex gap-5'>
          <input
            className='px-4 py-2 rounded-sm text-black/80 placeholder:text-black/70'
            name='client'
            placeholder='Client name'
            required
          />
          <input
            className='px-4 py-2 rounded-sm text-black/80'
            type='date'
            name='checkIn'
            required
          />
          <input
            className='px-4 py-2 rounded-sm text-black/80'
            type='date'
            name='checkOut'
            required
          />
          <button
            type='submit'
            className='text-white border-white/80 hover:border-white transition-colors border px-7 rounded-sm'
          >
            Save
          </button>
        </form>
      </div>

      <Dates dates={dates} />

      <div className='mb-10'>
        <button
          className='text-white/80 hover:text-white transition-colors mt-5'
          onClick={() => {
            setDates([])
            localStorage.removeItem('dates')
          }}
        >
          Clear data
        </button>
      </div>
    </>
  )
}
