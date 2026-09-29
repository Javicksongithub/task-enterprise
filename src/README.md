# 🚀 TaskEnterprise

> Sistema corporativo de gestão de tarefas de alta performance, desenvolvido com arquitetura full-stack moderna, suporte a PWA (Progressive Web App) e identidade visual inspirada nas cores nacionais da Guiné-Bissau.




# 🚀 TaskEnterprise

TaskEnterprise é uma aplicação full-stack moderna de gerenciamento de tarefas, desenvolvida como um PWA (Progressive Web App) para facilitar o controle de demandas diárias com alta performance e confiabilidade.

## 🛠️ Tecnologias Utilizadas

### **Back-end**
* **Java 17**
* **Spring Boot 3.2.5** (Spring Web, Spring Data JPA)
* **Banco de Dados**: PostgreSQL (hospedado no **Supabase** via Transaction Pooler)
* **Gerenciador de Dependências**: Maven

### **Front-end**
* **HTML5, CSS3, JavaScript (Vanilla)**
* **Service Worker & Web App Manifest** (Suporte a instalação PWA)

---

## 📂 Estrutura do Projeto

A organização dos diretórios segue o padrão oficial do Spring Boot para garantir o empacotamento automático dos recursos estáticos:

```text
task-enterprise/
├── src/
│   ├── main/
│   │   ├── java/com/enterprise/task_enterprise/  # Controladores, Services, Repositories, Models e DTOs
│   │   └── resources/
│   │       ├── application.properties           # Configurações de porta e conexão com o banco
│   │       └── static/                          # Arquivos do Front-end servidos pelo Spring Boot
│   │           ├── index.html
│   │           ├── style.css
│   │           ├── app.js
│   │           ├── sw.js
│   │           └── manifest.json
│   └── test/                                    # Testes unitários e de integração
├── pom.xml                                      # Configuração do Maven
└── render.yaml                                  # Configuração de deploy para o Render