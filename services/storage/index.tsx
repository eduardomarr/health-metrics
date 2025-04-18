import { AppData } from "@/utils/types"

export const loadData = (): AppData => {
  if (typeof window === 'undefined') return { userData: {}, imcData: {}, tmbData: {}, history: [] }
  const data = localStorage.getItem('healthMetricsData')
  return data ? JSON.parse(data) : { userData: {}, imcData: {}, tmbData: {}, history: [] }
}

export const saveData = (data: AppData) => {
  localStorage.setItem('healthMetricsData', JSON.stringify(data))
}