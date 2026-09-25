# Usa uma imagem oficial do OpenJDK para rodar o Java 17 ou superior (ajuste conforme a sua versão)
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Copia o Maven Wrapper e o pom.xml
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Baixa as dependências (faz cache)
RUN ./mvnw dependency:go-offline

# Copia o código fonte
COPY src ./src

# Compila o projeto gerando o jar
RUN ./mvnw clean package -DskipTests

# Expõe a porta 8080
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["java", "-jar", "target/task-enterprise-0.0.1-SNAPSHOT.jar"]