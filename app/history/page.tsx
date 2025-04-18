'use client'
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { loadData } from "@/services/storage"
import { HistoryItem } from "@/utils/types"
import Link from "next/link"

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    const data = loadData()
    setHistory(data.history || [])
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Histórico de Cálculos</h1>

      {history.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Nenhum registro encontrado
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.type}
                </TableCell>
                <TableCell>
                  {item.type === 'IMC'
                    ? `${item.data.resultado?.toFixed(1)} - ${item.data.classificacao}`
                    : `${Math.round(item.data.resultado ?? 0)} kcal`}
                </TableCell>
                <TableCell>
                  {new Date(item.data.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
                <TableCell>
                  <Button variant="link" asChild>
                    <Link href={`/details/${item.id}`}>
                      Ver detalhes
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}