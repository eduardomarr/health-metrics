'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { loadData } from "@/services/storage"
import { HistoryItem } from "@/utils/types"

export default function Details() {
  const { id } = useParams()
  const [item, setItem] = useState<HistoryItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = loadData()
    const foundItem = data.history.find((item: HistoryItem) => item.id === id)
    setItem(foundItem || null)
    setLoading(false)
  }, [id])

  if (loading) {
    return <div className="max-w-2xl mx-auto p-6">Carregando...</div>
  }

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Registro não encontrado</h1>
        <Button asChild>
          <a href="/history">Voltar ao Histórico</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <a href="/history">← Voltar ao Histórico</a>
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-6">
        Detalhes do {item.type} - {new Date(item.data.date).toLocaleDateString('pt-BR')}
      </h1>

      <div className="space-y-4">
        {item.type === 'IMC' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Peso (kg)</label>
                <div className="p-2 border rounded">{item.data.peso || 'N/A'}</div>
              </div>
              <div>
                <label className="text-sm font-medium">Altura (cm)</label>
                <div className="p-2 border rounded">{item.data.altura || 'N/A'}</div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Resultado IMC</label>
              <div className="p-2 border rounded">
                {item.data.resultado?.toFixed(1)} - {item.data.classificacao}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Idade</label>
                <div className="p-2 border rounded">{item.data.idade || 'N/A'}</div>
              </div>
              <div>
                <label className="text-sm font-medium">Sexo</label>
                <div className="p-2 border rounded">
                  {item.data.sexo === 'male' ? 'Masculino' : 'Feminino'}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Fórmula</label>
                <div className="p-2 border rounded">
                  {item.data.formula === 'mifflin' ? 'Mifflin-St Jeor' : 'Harris-Benedict'}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Nível de Atividade</label>
                <div className="p-2 border rounded capitalize">
                  {item.data.nivelAtividade || 'N/A'}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">TMB</label>
                <div className="p-2 border rounded">
                  {Math.round(item.data.resultado ?? 0)} kcal
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Necessidade Diária</label>
                <div className="p-2 border rounded">
                  {Math.round(item.data.needs ?? 0)} kcal
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Fator Atividade</label>
                <div className="p-2 border rounded">
                  {item.data.nivelAtividade || 'N/A'}
                </div>
              </div>
            </div>
            <div className="pt-4">
            <h3 className="font-medium mb-2">Sugestões Calóricas:</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded">
                <div className="text-sm text-blue-600">Déficit (15%)</div>
                <div className="font-medium">
                  {Math.round(item.data.suggestions?.deficit ?? 0)} kcal
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded">
                <div className="text-sm text-green-600">Manutenção</div>
                <div className="font-medium">
                  {Math.round(item.data.suggestions?.maintenance ?? 0)} kcal
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded">
                <div className="text-sm text-orange-600">Superávit (15%)</div>
                <div className="font-medium">
                  {Math.round(item.data.suggestions?.surplus ?? 0)} kcal
                </div>
              </div>
            </div>
          </div>
          </>
        )}

        <div className="pt-4">
          <label className="text-sm font-medium">Data do Cálculo</label>
          <div className="p-2 border rounded">
            {new Date(item.data.date).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  )
}