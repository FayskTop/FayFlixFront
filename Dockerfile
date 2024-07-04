FROM node:latest as build

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos necessários e instalar as dependências
COPY package.json package-lock.json /app/
RUN npm install

# Copiar o resto dos arquivos do projeto
COPY . /app/

# Build do projeto Angular
RUN npm run build --prod

# Estágio 2: Servir o aplicativo compilado usando nginx
FROM nginx:latest

# Copiar os arquivos de build do estágio anterior para o diretório de trabalho do nginx
COPY --from=build /app/dist/FayFlixFront /usr/share/nginx/html

# Remover configurações padrão do nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copiar a configuração personalizada do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor a porta 80 para o contêiner
EXPOSE 80

# Comando para iniciar o nginx quando o contêiner for iniciado
CMD ["nginx", "-g", "daemon off;"]
