import { ActivityLevel, Formula, IMCCategory, Sex } from "./types";

export const calculateIMC = (weight: number, height: number): number => {
  if (height <= 0) throw new Error('Altura inválida');
  const heightInMeters = height / 100;
  return weight / (heightInMeters ** 2);
};

export const classifyIMC = (imc: number): IMCCategory => {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidade grau I';
  if (imc < 40) return 'Obesidade grau II';
  return 'Obesidade grau III';
};

export const calculateBMR = (
  age: number,
  sex: Sex,
  weight: number,
  height: number,
  formula: Formula
): number => {
  if (formula === 'mifflin') {
    return sex === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Fórmula Harris-Benedict
  return sex === 'male'
    ? 66.5 + 13.75 * weight + 5.003 * height - 6.755 * age
    : 655.1 + 9.563 * weight + 1.850 * height - 4.676 * age;
};

export const getActivityMultiplier = (level: ActivityLevel): number => {
 const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };
  return multipliers[level] ?? 1.2;
};

export const calculateCaloricNeeds = (
  bmr: number,
  activityLevel: ActivityLevel
): number => {
  return Math.round(bmr * getActivityMultiplier(activityLevel));
};

export const getCaloricSuggestions = (maintenanceCalories: number) => {
  return {
    deficit: Math.round(maintenanceCalories * 0.85), // 15% de déficit
    maintenance: maintenanceCalories,
    surplus: Math.round(maintenanceCalories * 1.15) // 15% de superávit
  };
};

