# Health Metrics 🩺📊

Aplicação web moderna para cálculos de saúde e monitoramento metabólico. Calcule IMC, TMB e acompanhe seu histórico de métricas de saúde.

**Demo Online:** [https://health-metrics-project.netlify.app/](https://health-metrics-project.netlify.app/)

## ✨ Funcionalidades

- **Gerenciamento de Perfil**
  - Salvar informações pessoais (idade, sexo)
  - Persistência de dados com localStorage
- **Calculadoras de Saúde**
  - IMC (Índice de Massa Corporal)
  - TMB (Taxa Metabólica Basal)
  - Suporte a múltiplas fórmulas (Mifflin-St Jeor e Harris-Benedict)
- **Recomendações**
  - Classificação da OMS para resultados de IMC
  - Sugestões de necessidades calóricas (déficit/manutenção/superávit)
- **Histórico**
  - Registro completo de cálculos
  - Visualização detalhada de cada registro


## 🛠 Tecnologias

![Next.js](https://img.shields.io/badge/-Next.js-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/-shadcn/ui-000000?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

## 🚀 Começando

### Pré-requisitos

- Node.js ≥18.x
- npm ≥9.x

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/health-metrics.git
```

2. instale as dependencias:
```bash
npm install
```

3. execute o projeto:
```bash
npm run dev
```

## 🧪 Testes

- Para executar os testes automatizados e conferir o coverage, siga os passos abaixo:

### Executar testes unitários

- Rode o comando abaixo para executar os testes:
```bash
npm test
```

### Relatório de Coverage (Cobertura de Testes)

- Após executar o comando acima, será gerado um relatório detalhado de cobertura. Para visualizar no navegador, siga os passos abaixo:

Abra o arquivo index.html localizado em:
```bash
coverage/lcov-report/index.html
```
Este relatório interativo exibirá informações completas sobre a cobertura dos testes no código, indicando quais partes do código foram ou não cobertas pelos testes.

