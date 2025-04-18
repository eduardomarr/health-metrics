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
  data: {
    // Campos comuns
    resultado?: number
    date: string

    // Campos específicos do IMC
    peso?: number
    altura?: number
    classificacao?: string

    // Campos específicos do TMB
    idade?: number
    sexo?: 'male' | 'female'
    formula?: 'mifflin' | 'harris'
    nivelAtividade?: string
    needs?: number
    suggestions?: {
      deficit: number
      maintenance: number
      surplus: number
    }
  }
}

export type AppData = {
  userData: UserData
  imcData: IMCData
  tmbData: TMBData
  history: HistoryItem[]
}

