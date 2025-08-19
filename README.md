# 🚀 CryptoTrader - Plataforma de Criptomoedas

Uma aplicação moderna e responsiva para acompanhar preços de criptomoedas em tempo real, com gráficos interativos e sistema de favoritos.

## ✨ Funcionalidades

- 📊 **Listagem de Criptomoedas**: Preços, variações e dados de mercado
- 🔍 **Busca e Filtros**: Pesquisa por nome/símbolo e ordenação
- 📈 **Gráficos Interativos**: Histórico de preços com múltiplos timeframes
- ⭐ **Sistema de Favoritos**: Salvo no localStorage
- 🎨 **Design Moderno**: Interface dark theme com glass morphism
- 📱 **Responsivo**: Funciona em desktop e mobile

## 🛠️ Tecnologias

- **React 19** - Framework principal
- **Vite** - Build tool e dev server
- **Recharts** - Gráficos interativos
- **Axios** - Requisições HTTP
- **Lucide React** - Ícones
- **CoinGecko API** - Dados de criptomoedas

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── charts/          # Componentes de gráficos
│   │   └── PriceChart.jsx
│   ├── crypto/          # Componentes de criptomoedas
│   │   ├── CryptoCard.jsx
│   │   └── CryptoFilters.jsx
│   ├── ui/              # Componentes de interface
│   │   └── Header.jsx
│   └── index.js         # Exportações centralizadas
├── constants/           # Constantes da aplicação
│   ├── api.js
│   ├── chart.js
│   └── sorting.js
├── hooks/               # Hooks personalizados
│   └── useFavorites.js
├── services/            # Serviços e APIs
│   └── cryptoApi.js
├── types/               # Definições de tipos
│   └── crypto.js
├── utils/               # Utilitários
│   ├── formatters.js
│   └── storage.js
├── App.jsx              # Componente principal
├── main.jsx            # Entry point
└── index.css           # Estilos globais
```

## 🚀 Como Executar

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd cripto
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:5173
   ```

## 🔧 Configuração da API

O projeto usa a API gratuita do CoinGecko. Para melhor performance, você pode:

1. Obter uma chave gratuita em [CoinGecko](https://www.coingecko.com/en/api)
2. Atualizar a chave em `src/constants/api.js`

## 📊 Funcionalidades Detalhadas

### Listagem de Criptomoedas
- Preço atual e variação 24h
- Market cap e volume
- Ranking por popularidade
- Ícones das criptomoedas

### Sistema de Busca
- Busca por nome ou símbolo
- Filtro de favoritos
- Ordenação por múltiplos critérios

### Gráficos
- Múltiplos timeframes (1D, 7D, 1M, 3M, 1Y)
- Dados históricos precisos
- Tooltips interativos
- Estatísticas de preço

### Favoritos
- Adicionar/remover favoritos
- Persistência no localStorage
- Filtro para mostrar apenas favoritos

## 🎨 Design System

- **Tema**: Dark mode com gradientes
- **Cores**: Verde para positivos, vermelho para negativos
- **Tipografia**: Inter font family
- **Componentes**: Glass morphism e bordas arredondadas

## 📱 Responsividade

- Desktop: Layout completo com sidebar
- Tablet: Layout adaptativo
- Mobile: Layout otimizado para touch

## 🔒 Segurança

- Validação de dados da API
- Tratamento de erros robusto
- Sanitização de inputs
- Rate limiting para requisições

## 🚀 Deploy

Para fazer deploy:

```bash
npm run build
```

Os arquivos estarão em `dist/` prontos para deploy.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte ou dúvidas, abra uma issue no repositório.
