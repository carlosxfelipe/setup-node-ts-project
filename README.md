# Node com TypeScript - Recomendado

1. Instalar TypeScript e demais dependências

```
npm i -D typescript @types/node ts-node nodemon rimraf
```

2. Inicializar o arquivo de configuração do TypeScript (Pode ser configurado conforme desejo)

```
npx tsc --init --outDir dist/ --rootDir src
```

3. Criar arquivo de configuração do Nodemon - nodemon.json

```
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/app.ts"
}
```

4. Modificar o arquivo `package.json` para incluir scripts para dev, build e start

```
  "dev": "nodemon",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"
```

5. Modificar o arquivo `tsconfig.json` para especificar diretórios incluídos e excluídos

```json
{
  "exclude": ["node_modules"],
  "include": ["src/**/*"],
  "compilerOptions": {
    ...
  }
}
```
