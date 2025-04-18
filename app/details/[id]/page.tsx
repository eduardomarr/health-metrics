
'use client'
import { loadData } from '@/services/storage'
import { HistoryItem } from '@/utils/types'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Detalhes() {
  const { id } = useParams()
  const [item, setItem] = useState<HistoryItem | null>(null)

  useEffect(() => {
    const data = loadData()
    const foundItem = data.history.find(i => i.id === id)
    setItem(foundItem || null)
  }, [id])

  return (
    <div className="max-w-2xl mx-auto p-6">
      {item && (
        <div>
          <h1 className="text-2xl font-bold mb-4">{item.type}</h1>
          <pre>{JSON.stringify(item.data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}