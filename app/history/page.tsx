import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CalculoTMB() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Calculadora TMB</h1>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Idade</label>
            <Input type="number" placeholder="Ex: 30" />
          </div>
          <div>
            <label>Sexo</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Feminino</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Peso (kg)</label>
            <Input type="number" placeholder="Ex: 70" />
          </div>
          <div>
            <label>Altura (cm)</label>
            <Input type="number" placeholder="Ex: 175" />
          </div>
        </div>

        <div>
          <label>Fórmula</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a fórmula" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mifflin">Mifflin-St Jeor</SelectItem>
              <SelectItem value="harris">Harris-Benedict</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full">Calcular TMB</Button>

        {/* Resultado */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="font-semibold">Resultado:</h2>
          <p className="text-lg">TMB: 1800 kcal/dia</p>
          <p className="text-sm text-gray-600 mt-2">Déficit calórico sugerido: 1500 kcal/dia</p>
        </div>
      </div>
    </div>
  )
}