'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AppData, IMCData } from '@/utils/types'
import { loadData, saveData } from '@/services/storage'
import { calculateIMC, classifyIMC } from '@/services/formulas'

export default function IMC() {
  const [formData, setFormData] = useState<IMCData>({})
  const [result, setResult] = useState<{ imc: number; category: string } | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const data = loadData()
    if (data.imcData) {
      setFormData(data.imcData)
      if (data.imcData.resultado) {
        setResult({
          imc: data.imcData.resultado,
          category: data.imcData.classificacao || ''
        })
      }
    }
    setLoaded(true)
  }, [])

  const handleCalculate = () => {
    const weight = formData.peso || 0
    const height = formData.altura || 0

    if (!weight || !height) return

    const imc = calculateIMC(weight, height)
    const category = classifyIMC(imc)

    const newData: IMCData = {
      ...formData,
      resultado: imc,
      classificacao: category
    }

    const currentData = loadData()
    const updatedData: AppData = {
      ...currentData,
      imcData: newData
    }

    saveData(updatedData)
    setResult({ imc, category })
  }

  const handleNext = () => {
    window.location.href = '/tmb'
  }

  if (!loaded) return <div className="p-6">Carregando dados...</div>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Calculadora IMC</h1>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Peso (kg)</label>
            <Input
              type="number"
              placeholder="Ex: 70"
              value={formData.peso || ''}
              onChange={(e) => setFormData({
                ...formData,
                peso: parseFloat(e.target.value)
              })}
            />
          </div>
          <div>
            <label>Altura (cm)</label>
            <Input
              type="number"
              placeholder="Ex: 175"
              value={formData.altura || ''}
              onChange={(e) => setFormData({
                ...formData,
                altura: parseFloat(e.target.value)
              })}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            className="flex-1"
            onClick={handleCalculate}
          >
            Calcular IMC
          </Button>

          <Button
            className="flex-1"
            variant="secondary"
            onClick={() => {
              setFormData({})
              setResult(null)
            }}
          >
            Limpar
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="font-semibold">Resultado:</h2>
            <p className="text-lg">
              IMC: {result.imc.toFixed(1)} - {result.category}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Classificação segundo a OMS
            </p>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/user'}
          >
            Voltar
          </Button>
          <Button
            onClick={handleNext}
            disabled={!result}
          >
            Próximo: Calcular TMB →
          </Button>
        </div>
      </div>
    </div>
  )
}