const { execSync } = require("child_process");
const fs = require("fs");
const readline = require("readline");

// Função para perguntar o nome do projeto
const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
};

// Função para verificar se um comando está disponível
const commandExists = (command) => {
  try {
    execSync(`command -v ${command}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

(async () => {
  // Verificação de pré-requisitos
  if (!commandExists("npm")) {
    console.error(
      "Erro: npm não está instalado. Por favor, instale o npm e tente novamente."
    );
    process.exit(1);
  }

  // Passo 1: Perguntar o nome do projeto
  const projectName = await askQuestion("Qual é o nome do projeto? ");

  try {
    // Criar a pasta do projeto
    fs.mkdirSync(projectName);
    process.chdir(projectName);

    // Criar package.json
    console.log("Inicializando package.json...");
    execSync("npm init -y", { stdio: "inherit" });

    // Passo 2: Instalar TypeScript e outras dependências
    console.log("Instalando dependências...");
    execSync("npm i -D typescript @types/node ts-node nodemon rimraf", {
      stdio: "inherit",
    });

    // Passo 3: Inicializar o arquivo de configuração do TypeScript
    console.log("Inicializando arquivo de configuração do TypeScript...");
    execSync("npx tsc --init --outDir dist/ --rootDir src", {
      stdio: "inherit",
    });

    // Criar a pasta src
    fs.mkdirSync("src");
    fs.writeFileSync("src/app.ts", "");

    // Passo 4: Criar arquivo de configuração do Nodemon
    console.log("Criando arquivo de configuração do Nodemon...");
    const nodemonConfig = `
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/app.ts"
}
`;
    fs.writeFileSync("nodemon.json", nodemonConfig.trim());

    // Passo 5: Criar scripts para dev, build e start
    console.log("Adicionando scripts ao package.json...");
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    packageJson.scripts = {
      ...packageJson.scripts,
      dev: "nodemon",
      build: "rimraf ./dist && tsc",
      start: "npm run build && node dist/app.js",
    };

    // Passo 6: Criar arquivo README.md
    let readmeContent = `
# ${projectName}

## Como rodar o projeto

### Instalar as dependências

\`\`\`sh
npm install
\`\`\`

### Rodar em modo de desenvolvimento

\`\`\`sh
npm run dev
\`\`\`

### Construir o projeto

\`\`\`sh
npm run build
\`\`\`

### Iniciar o projeto

\`\`\`sh
npm start
\`\`\`
`;

    // Passo 7: Perguntar se deseja configurar o Jest
    const configureJest = await askQuestion("Deseja configurar o Jest? (y/n) ");

    if (configureJest.toLowerCase() === "y") {
      console.log("Instalando Jest e dependências...");
      execSync("npm install -D jest @types/jest ts-jest supertest", {
        stdio: "inherit",
      });

      console.log("Configurando jest.config.js...");
      const jestConfig = `
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['text', 'lcov'],
  clearMocks: false,
  collectCoverage: true,
};
`;
      fs.writeFileSync("jest.config.js", jestConfig.trim());

      console.log("Adicionando scripts de teste ao package.json...");
      packageJson.scripts = {
        ...packageJson.scripts,
        test: "jest",
        "test:watch": "jest --watch",
        "test:coverage": "jest --coverage",
      };

      readmeContent += `
### Rodar os testes

\`\`\`sh
npm test
\`\`\`

### Rodar os testes em modo watch

\`\`\`sh
npm run test:watch
\`\`\`

### Gerar cobertura dos testes

\`\`\`sh
npm run test:coverage
\`\`\`
`;

      console.log("Configuração do Jest completa!");
    }

    fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
    fs.writeFileSync("README.md", readmeContent.trim());

    console.log("Configuração completa!");
  } catch (error) {
    console.error(
      "Ocorreu um erro durante a configuração do projeto:",
      error.message
    );
  }
})();
