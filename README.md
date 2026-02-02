# Inventory Dashboard

Um dashboard interativo para gerenciamento de inventário desenvolvido com **Next.js**, **React** e **TypeScript**.

## 🚀 Tecnologias

- **Next.js 15+** - Framework React
- **React 19+** - Interface de usuário
- **TypeScript** - Tipagem estática
- **Jest & React Testing Library** - Testes automatizados
- **CSS Modules** - Estilos encapsulados

## 📋 Funcionalidades

- ✅ **Listagem de Produtos** - Visualize todos os produtos com informações detalhadas
- 🔍 **Filtros Avançados** - Busque por nome e filtre por categoria
- ✔️ **Seleção em Massa** - Selecione múltiplos produtos simultaneamente
- 📦 **Ações em Lote** - Altere categoria, aplique descontos ou mude status de vários produtos
- 📄 **Paginação** - Navegue entre páginas (10 itens por página)

## 🛠️ Instalação

```bash
npm install
```

## ▶️ Como Executar

**Modo Desenvolvimento:**
```bash
npm run dev
```

Acesse `http://localhost:3000` no seu navegador.

**Build para Produção:**
```bash
npm run build
npm start
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Modo watch
npm test -- --watch
```

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `dev` | Inicia servidor de desenvolvimento |
| `build` | Compila o projeto para produção |
| `start` | Inicia servidor de produção |
| `test` | Executa testes com Jest |
| `lint` | Verifica código com ESLint |

## 🎯 Componentes Principais

- **ProductTable** - Tabela principal com lista de produtos
- **ProductRow** - Linha individual da tabela
- **Filters** - Barra de filtros e busca
- **BulkActions** - Ações para múltiplos produtos
- **LoadingSpinner** - Indicador de carregamento
- **EmptyState** - Estado vazio com mensagem

## 📖 Como Usar

1. Acesse a página de inventário
2. Use os filtros para buscar produtos específicos
3. Selecione um ou mais produtos
4. Aplique ações em lote (alterar categoria, aplicar desconto, mudar status)
5. Navegue entre páginas conforme necessário

---

**Desenvolvido com ❤️ usando Next.js**
