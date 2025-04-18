'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppData, HistoryItem, TMBData } from '@/utils/types'
import { loadData, saveData } from '@/services/storage'
import { calculateBMR, calculateCaloricNeeds, getCaloricSuggestions } from '@/services/formulas'
import { ActivityLevel, Formula } from '@/services/formulas/types'


export default function TMB() {
  const [formData, setFormData] = useState<Omit<TMBData, 'idade' | 'sexo' | 'peso' | 'altura'>>({})
  const [userData, setUserData] = useState<{
    idade?: number
    sexo?: 'male' | 'female'
    peso?: number
    altura?: number
  }>({})
  const [result, setResult] = useState<{
    bmr: number
    needs: number
    suggestions: { deficit: number; maintenance: number; surplus: number }
  } | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const data = loadData()
    setUserData({
      idade: data.userData.idade,
      sexo: data.userData.sexo,
      peso: data.imcData.peso,
      altura: data.imcData.altura
    })
    setFormData(data.tmbData || {})
    setLoaded(true)
  }, [])

  const handleCalculate = () => {
    if (!userData.idade || !userData.peso || !userData.altura || !userData.sexo) {
      alert('Complete seus dados pessoais primeiro!')
      return
    }

    const bmr = calculateBMR(
      userData.idade,
      userData.sexo,
      userData.peso,
      userData.altura,
      formData.formula || 'mifflin'
    )

    const needs = calculateCaloricNeeds(bmr, formData.nivelAtividade || 'sedentary')
    const suggestions = getCaloricSuggestions(needs)

    const newTMBData = {
      ...formData,
      resultado: bmr,
      needs: needs,
      suggestions: suggestions,
      idade: userData.idade,
      sexo: userData.sexo,
      formula: formData.formula,
      nivelAtividade: formData.nivelAtividade
    }

    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      type: 'TMB',
      data: newTMBData,
      date: new Date().toISOString()
    }

    const currentData = loadData()
    const updatedData: AppData = {
      ...currentData,
      tmbData: newTMBData,
      history: [...currentData.history, historyItem]
    }

    saveData(updatedData)
    setResult({ bmr, needs, suggestions })
  }

  const handleNext = () => {
    window.location.href = '/history'
  }

  if (!loaded) return <div className="p-6">Carregando dados...</div>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Calculadora TMB</h1>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Dados Pessoais Utilizados:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p>Idade: {userData.idade || 'Não informada'}</p>
            <p>Sexo: {userData.sexo ? (userData.sexo === 'male' ? 'Masculino' : 'Feminino') : 'Não informado'}</p>
            <p>Peso: {userData.peso ? `${userData.peso} kg` : 'Não informado'}</p>
            <p>Altura: {userData.altura ? `${userData.altura} cm` : 'Não informado'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Fórmula</label>
            <Select
              value={formData.formula}
              onValueChange={(v: Formula) => setFormData({
                ...formData,
                formula: v
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a fórmula" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mifflin">Mifflin-St Jeor</SelectItem>
                <SelectItem value="harris">Harris-Benedict</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>Nível de Atividade</label>
            <Select
              value={formData.nivelAtividade}
              onValueChange={(v: ActivityLevel) => setFormData({
                ...formData,
                nivelAtividade: v
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentário</SelectItem>
                <SelectItem value="light">Leve</SelectItem>
                <SelectItem value="moderate">Moderado</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="veryActive">Muito Ativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            className="flex-1"
            onClick={handleCalculate}
            disabled={!userData.idade || !userData.peso || !userData.altura || !userData.sexo}
          >
            Calcular TMB
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
          <div className="mt-6 p-4 bg-gray-100 rounded-lg space-y-2">
            <h2 className="font-semibold">Resultados:</h2>
            <p>Taxa Metabólica Basal: {Math.round(result.bmr)} kcal/dia</p>
            <p>Necessidade Calórica Diária: {Math.round(result.needs)} kcal/dia</p>

            <div className="pt-4 border-t mt-4">
              <h3 className="font-medium">Sugestões:</h3>
              <ul className="list-disc pl-6">
                <li>Déficit calórico (15%): {Math.round(result.suggestions.deficit)} kcal/dia</li>
                <li>Manutenção: {Math.round(result.suggestions.maintenance)} kcal/dia</li>
                <li>Superávit calórico (15%): {Math.round(result.suggestions.surplus)} kcal/dia</li>
              </ul>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/imc'}
          >
            Voltar
          </Button>
          <Button
            onClick={handleNext}
            disabled={!result}
          >
            Ver Histórico →
          </Button>
        </div>
      </div>
    </div>
  )
}