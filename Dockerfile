# Etapa 1: Construção (Build) usando Maven e Java 17
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Compila o projeto ignorando os testes para ser mais rápido
RUN mvn clean package -DskipTests

# Etapa 2: Execução (Run) usando uma versão mais leve do Java
FROM openjdk:17-jdk-slim
WORKDIR /app
# Copia o ficheiro .jar gerado na etapa anterior
COPY --from=build /app/target/portifolio-backend-0.0.1-SNAPSHOT.jar app.jar
# Expõe a porta que o Spring Boot usa
EXPOSE 8080
# Comando de arranque
ENTRYPOINT ["java", "-jar", "app.jar"]