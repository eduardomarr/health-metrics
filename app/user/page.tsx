'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { loadData, saveData } from "@/services/storage"
import { AppData, UserData } from "@/utils/types"
import { useEffect, useState } from "react"

export default function DadosUsuario() {
  const [formData, setFormData] = useState<UserData>({
    nome: '',
    idade: undefined,
    sexo: 'male'
  })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const data = loadData()
    if (data.userData) {
      setFormData({
        nome: data.userData.nome || '',
        idade: data.userData.idade || undefined,
        sexo: data.userData.sexo || 'male'
      })
    }
    setLoaded(true)
  }, [])

  const handleSave = () => {
    const currentData = loadData()
    const newData: AppData = {
      ...currentData,
      userData: {
        nome: formData.nome,
        idade: Number(formData.idade),
        sexo: formData.sexo
      }
    }
    saveData(newData)
    window.location.href = '/imc'
  }

  if (!loaded) return <div>Carregando...</div>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Seus Dados</h1>

      <div className="space-y-4">
        <div>
          <Label>Nome</Label>
          <Input
            placeholder="Digite seu nome"
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
          />
        </div>

        <div>
          <Label>Idade</Label>
          <Input
            type="number"
            placeholder="Idade"
            value={formData.idade || ''}
            onChange={(e) => setFormData({...formData, idade: Number(e.target.value)})}
          />
        </div>

        <div>
          <Label>Sexo</Label>
          <RadioGroup
            value={formData.sexo}
            onValueChange={(value: 'male' | 'female') => setFormData({...formData, sexo: value})}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Masculino</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Feminino</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Voltar
          </Button>
          <Button onClick={handleSave}>
            Salvar e Ir para IMC
          </Button>
        </div>
      </div>
    </div>
  )
}