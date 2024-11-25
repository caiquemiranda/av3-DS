# Etapa 1: Construção
FROM node:16-alpine AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todo o código-fonte para o contêiner
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Etapa 2: Servir a aplicação usando um servidor web nginx
FROM nginx:stable-alpine

# Copiar os arquivos construídos para o diretório padrão do nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Comando padrão para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
