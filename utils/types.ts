import { ActivityLevel } from "@/services/formulas/types"

export type UserData = {
  nome?: string
  idade?: number
  sexo?: 'male' | 'female'
}
export type IMCData = {
  peso?: number
  altura?: number
  resultado?: number
  classificacao?: string
}

export type TMBData = {
  idade?: number
  sexo?: 'male' | 'female'
  peso?: number
  altura?: number
  formula?: 'mifflin' | 'harris'
  nivelAtividade?: ActivityLevel
  resultado?: number
}

export type HistoryItem = {
  id: string
  type: 'IMC' | 'TMB'
  data: IMCData | TMBData
  date: string
}

export type AppData = {
  userData: UserData
  imcData: IMCData
  tmbData: TMBData
  history: HistoryItem[]
}

