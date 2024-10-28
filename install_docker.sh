#!/bin/bash

# Script para instalar o Docker e o Docker Compose

set -e

# Detectar o sistema operacional
OS_TYPE=$(uname -s)

if [[ "$OS_TYPE" == "Linux" ]]; then
    echo "Verificando se o Docker já está instalado..."

    if ! command -v docker &> /dev/null
    then
        echo "Docker não encontrado. Iniciando a instalação..."

        # Atualiza os pacotes existentes
        sudo apt-get update

        # Instala os pacotes necessários
        sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

        # Adiciona a chave GPG do Docker
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

        # Adiciona o repositório do Docker
        sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

        # Atualiza os pacotes novamente
        sudo apt-get update

        # Instala o Docker
        sudo apt-get install -y docker-ce

        echo "Docker instalado com sucesso!"
    else
        echo "Docker já está instalado. Versão:"
        docker --version
    fi

    echo "Verificando se o Docker Compose já está instalado..."

    if ! command -v docker-compose &> /dev/null
    then
        echo "Docker Compose não encontrado. Iniciando a instalação..."

        # Baixa a versão estável do Docker Compose
        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

        # Torna o arquivo executável
        sudo chmod +x /usr/local/bin/docker-compose

        echo "Docker Compose instalado com sucesso!"
    else
        echo "Docker Compose já está instalado. Versão:"
        docker-compose --version
    fi

elif [[ "$OS_TYPE" == "Darwin" ]]; then
    echo "Você está usando macOS. Para instalar o Docker, você pode usar o Homebrew. Execute os seguintes comandos:"

    echo "1. Atualize o Homebrew: brew update"
    echo "2. Instale o Docker: brew install --cask docker"
    echo "3. Inicie o Docker Desktop após a instalação."

else
    echo "Sistema operacional não suportado para instalação automática do Docker."
    echo "Se você estiver usando Windows, siga as instruções abaixo para instalar o Docker Desktop:"
    echo "1. Acesse o site oficial do Docker: https://www.docker.com/products/docker-desktop"
    echo "2. Faça o download do Docker Desktop."
    echo "3. Siga o assistente de instalação."
    echo "4. Após a instalação, inicie o Docker Desktop."
fi
