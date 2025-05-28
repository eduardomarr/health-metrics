import {
  calculateIMC,
  classifyIMC,
  calculateBMR,
  getActivityMultiplier,
  calculateCaloricNeeds,
  getCaloricSuggestions } from "@/services/formulas";

import { ActivityLevel } from "@/services/formulas/types";

describe('Health Metrics Calculations', () => {
  describe('calculateIMC', () => {
    it('deve calcular o IMC corretamente', () => {
     expect(calculateIMC(70, 175)).toBeCloseTo(22.86, 1);
    });

    it('deve lançar erro para altura zero', () => {
      expect(() => calculateIMC(70, 0)).toThrow('Altura inválida');
    });
  });

  describe('classifyIMC', () => {
    const testCases = [
      [17, 'Abaixo do peso'],
      [22, 'Peso normal'],
      [27, 'Sobrepeso'],
      [32, 'Obesidade grau I'],
      [37, 'Obesidade grau II'],
      [42, 'Obesidade grau III']
    ];

    test.each(testCases)('IMC %f deve classificar como %s', (imc, expected) => {
      expect(classifyIMC(imc as number)).toBe(expected);
    });
  });

  describe('calculateBMR', () => {
    it('Mifflin-St Jeor masculino', () => {
      expect(calculateBMR(30, 'male', 80, 180, 'mifflin')).toBe(1780);
    });

    it('Harris-Benedict feminino', () => {
      expect(calculateBMR(25, 'female', 60, 165, 'harris')).toBeCloseTo(1417.23, 2);

    });

  });

  describe('getActivityMultiplier', () => {
    const activities = [
      ['sedentary', 1.2],
      ['light', 1.375],
      ['moderate', 1.55],
      ['active', 1.725],
      ['veryActive', 1.9],
      ['invalid', 1.2]
    ];

    test.each(activities)('atividade %s deve retornar %f', (level, expected) => {
      expect(getActivityMultiplier(level as ActivityLevel)).toBe(expected);
    });
  });

  describe('calculateCaloricNeeds', () => {
    it('deve calcular corretamente', () => {
      expect(calculateCaloricNeeds(1500, 'moderate')).toBe(2325);
    });
  });

  describe('getCaloricSuggestions', () => {
    it('deve calcular sugestões corretamente', () => {
      expect(getCaloricSuggestions(2000)).toEqual({
        deficit: 1700,
        maintenance: 2000,
        surplus: 2300
      });
    });
  });
});