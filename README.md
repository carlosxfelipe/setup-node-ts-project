# Script de Inicialização de Projeto Node.js com TypeScript

Este script automatiza a configuração inicial de um projeto Node.js com TypeScript. Ele executa os seguintes passos:

1. Verifica se o `npm` está instalado.
2. Pergunta o nome do projeto.
3. Cria uma pasta com o nome do projeto e navega para dentro dela.
4. Inicializa um arquivo `package.json`.
5. Instala as dependências necessárias: TypeScript, @types/node, ts-node, nodemon e rimraf.
6. Inicializa o arquivo de configuração do TypeScript (`tsconfig.json`).
7. Cria a pasta `src` e um arquivo `src/app.ts` vazio.
8. Cria um arquivo de configuração do Nodemon (`nodemon.json`).
9. Adiciona scripts ao `package.json` para facilitar o desenvolvimento, construção e execução do projeto.
10. Cria um arquivo `README.md` com instruções de uso.
11. Pergunta se você deseja configurar o Jest para testes. Se sim, ele instala Jest e suas dependências, configura o `jest.config.js` e adiciona scripts de teste ao `package.json`.
12. Cria um arquivo `.gitignore` para excluir arquivos desnecessários de versionamento.

## Como rodar o script de configuração

### Passo 1: Executar o script de configuração

```sh
node setup-node-ts-project.js
```

### Passo 2: Navegar para a pasta do projeto

Após executar o script, uma pasta com o nome do projeto será criada. Navegue para dentro desta pasta:

```sh
cd nome-do-projeto
```

Substitua `nome-do-projeto` pelo nome do projeto que você especificou ao executar o script.

## Como rodar o projeto

### Rodar em modo de desenvolvimento

```sh
npm run dev
```

### Construir o projeto

```sh
npm run build
```

### Iniciar o projeto

```sh
npm start
```

### Rodar os testes (se o Jest estiver configurado)

```sh
npm test
```

### Rodar os testes em modo watch (se o Jest estiver configurado)

```sh
npm run test:watch
```

### Gerar cobertura dos testes (se o Jest estiver configurado)

```sh
npm run test:coverage
```

## Estrutura do Projeto

- `src/`: Contém o código-fonte do projeto.
- `dist/`: Pasta onde o código compilado será gerado.
- `package.json`: Arquivo de configuração do npm com as dependências e scripts.
- `tsconfig.json`: Arquivo de configuração do TypeScript.
- `nodemon.json`: Arquivo de configuração do Nodemon.
- `jest.config.js`: Arquivo de configuração do Jest (se configurado).
- `README.md`: Arquivo com instruções de uso.

Este script facilita a criação de um ambiente de desenvolvimento completo para projetos Node.js com TypeScript, tornando o processo de inicialização mais rápido e menos propenso a erros.

## Agradecimentos

Este script é baseado nas aulas do instrutor Fernando Herrera Klerith (DevTalles)

https://cursos.devtalles.com/courses/nodejs-de-cero-a-experto
