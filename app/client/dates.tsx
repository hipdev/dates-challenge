import { Fragment } from 'react'
import { DateItem } from './client-form'

interface InputObject {
  client: string
  date: string
}

interface GroupedObject {
  client: string
  dates: string[]
}

function groupAndSort(input: InputObject[]): GroupedObject[] {
  const groupedMap = new Map<string, string[]>()

  // Group the input array by client
  input.forEach((item) => {
    if (groupedMap.has(item.client)) {
      groupedMap.get(item.client)?.push(item.date)
    } else {
      groupedMap.set(item.client, [item.date])
    }
  })

  // Create an array of GroupedObject
  const groupedArray: GroupedObject[] = []
  groupedMap.forEach((dates, client) => {
    groupedArray.push({ client, dates: dates.sort() })
  })

  // Sort the groupedArray based on the first date in each group
  groupedArray.sort((a, b) => a.dates[0].localeCompare(b.dates[0]))

  return groupedArray
}

export default function Dates({ dates }: { dates: DateItem[] }) {
  const datesList = dates.flatMap((date: any) => {
    const checkIn = new Date(date.checkIn)
    const checkOut = new Date(date.checkOut)
    const daysDiff =
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)

    const items = []
    for (let i = 0; i <= daysDiff; i++) {
      const currentDate = new Date(checkIn)
      currentDate.setDate(currentDate.getDate() + i)
      items.push({
        client: date.client,
        date: currentDate.toISOString().split('T')[0],
      })
    }

    return items
  })

  const items = groupAndSort(datesList)

  return (
    <div className='grid grid-cols-2 mt-10 gap-y-2 rounded-sm bg-white gap-x-10 px-5 py-7'>
      <div className='font-bold'>Client</div>
      <div className='font-bold mb-2'>Date</div>
      {datesList.length > 0 ? (
        items.map((item: any) => {
          return item.dates.map((date: string, index: number) => (
            <Fragment key={index}>
              <div>{item.client}</div>
              <div>{date}</div>
            </Fragment>
          ))
        })
      ) : (
        <p className='col-span-2'>Please add some clients</p>
      )}
    </div>
  )
}
