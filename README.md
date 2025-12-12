# Quiz Code App

Essa é a minha primeira aplicação feito usando o React Native e o Expo Go como emulador.

O Quiz Code é um aplicativo de quiz interativo e divertido, projetado para ajudar os usuários a aprenderem programação Java e Orientação a Objetos de uma forma lúdica.

## ✨ Features

- **Dois Desafios de Quiz:** Java Básico e Programação Orientada a Objetos (POO).
- **Interface Animada:** Animações e transições suaves para uma experiência de usuário agradável.
- **Feedback Sonoro:** Efeitos sonoros para respostas corretas e incorretas, e para celebrações.
- **Música de Fundo:** Uma trilha sonora para manter o usuário engajado.
- **Sistema de Pontuação:** Acompanhe seu progresso com um sistema de pontuação.
- **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela.
- **Modo Silencioso:** Opção para silenciar todos os sons do aplicativo.

## 🚀 Tecnologias Utilizadas

- **React Native:** Framework para desenvolvimento de aplicativos móveis multiplataforma.
- **Expo:** Plataforma e conjunto de ferramentas para construir e implantar aplicativos React Native.
- **Expo Router:** Para navegação baseada em arquivos entre as telas.
- **Expo Audio:** Para gerenciamento e reprodução de áudio.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **React Native Animatable:** Para animações declarativas e fáceis de usar.

## 🏁 Começando

Siga estas instruções para obter uma cópia do projeto em sua máquina local para desenvolvimento e teste.

### Pré-requisitos

- Node.js e npm (ou yarn)
- Expo Go instalado em seu dispositivo móvel (Android ou iOS)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd My-First-App
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```

### Executando o Aplicativo

1.  Inicie o servidor de desenvolvimento do Expo:
    ```bash
    npm start
    ```
2.  Abra o aplicativo Expo Go em seu dispositivo móvel.
3.  Escaneie o QR code exibido no terminal para abrir o aplicativo.

## 📂 Estrutura do Projeto

```
/
├── assets/          # Fontes, imagens e arquivos de áudio
├── constants/       # Cores e outros valores constantes
├── src/
│   ├── app/         # Telas da aplicação (usando Expo Router)
│   ├── componentes/ # Componentes reutilizáveis da UI
│   ├── database/    # Arquivos JSON com as perguntas do quiz
│   ├── hooks/       # Hooks personalizados (ex: useBackgroundSound)
│   ├── types/       # Definições de tipos TypeScript
│   └── utils/       # Funções utilitárias (ex: design responsivo)
├── package.json     # Dependências e scripts do projeto
└── README.md        # Este arquivo
```