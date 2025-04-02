# **KonectaFinance**

## **Tabla de Contenido**

1. [Descripción](#descripción)
2. [Funcionalidades](#funcionalidades)
3. [Requisitos](#requisitos)
4. [Instalación](#instalación)
   - [Usar Docker](#usar-docker)
   - [Sin Docker](#sin-docker)
     - [Configurar el servidor](#configurar-el-servidor)
     - [Configurar el frontend](#configurar-el-frontend)
5. [Uso](#uso)
6. [Imagenes del proyecto ](#imagenes-del-proyecto)


## **Descripción**

KonectaFinance es una aplicación de autenticación  gestión de usuarios y ventas de productos financieros construida con React en el frontend, Node.js con Express en el backend y MySQL como base de datos. Implementa JWT para autenticación y bcryptjs para la encriptación de contraseñas

## **Funcionalidades**

- **Autenticación de Usuarios**: Los usuarios pueden registrarse y acceder a la aplicación con credenciales seguras.
- **Protección con JWT:**: Se utilizan tokens para gestionar sesiones de usuario.
- **Gestión de Usuarios**: Permite la creación, modificación y eliminación de usuarios.
- **Gestión de Ventas**: Permite la creacion, modificacion y eliminacion de ventas.

## **Requisitos**

- Node.js
- MySQL
- npm (Node Package Manager)
- Docker
- Docker Compose

## **Instalación**

### **Usar Docker**

1. **Clonar el repositorio**

    ```bash
    https://github.com/davidriano02/KonectaFinance.git
    cd KonectaFinance
    ```

2. **Configurar el archivo `.env`**

    Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

    ```
    MYSQL_ROOT_PASSWORD=tu_contraseña
    MYSQL_DATABASE=bd en docker o localhost en local
    MYSQL_USER=tu_usuario
    MYSQL_PASSWORD=tu_contraseña debe ser igual a la que se agrega en el docker-compose.yml
    JWT_SECRET= Genera un JWTSECRETC para hacer pruebas

    Configura en el .env del frontend
    VITE_API_URL= url_backend
    ```

3. **Construir y levantar los contenedores**

    ```bash
    docker-compose up --build
    ```

    La aplicación debería estar corriendo en `http://localhost:3001`.



### **Sin Docker**

Si prefieres instalar y ejecutar la aplicación sin Docker, sigue estos pasos:

#### **Configurar el Proyecto**

1. **Navega a la carpeta del backend:**

    ```bash
    cd backend
    ```
2. **Instala las dependencias:**  

     ```bash
    npm install
    ```
3. **Configura la base de datos MySQL:**

    - Crea una base de datos llamada `financial_bank`.
    - Importa la estructura de la base de datos desde el archivo `financial_bank.sql`.

    ```sql
   CREATE DATABASE financial_bank;
   USE financial_bank;
   
   -- Create the Users Table
   CREATE TABLE users (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   email VARCHAR(50) NOT NULL UNIQUE,
   password VARCHAR(100) NOT NULL,
   user_type ENUM('Administrator', 'Advisor') NOT NULL,
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   
   -- Create the Sales Table
   CREATE TABLE sales (
   id INT AUTO_INCREMENT PRIMARY KEY,
   product ENUM('Consumer Credit', 'Payroll Loan', 'Credit Card') NOT NULL,
   requested_quota VARCHAR(20) NOT NULL,
   franchise ENUM('AMEX', 'VISA', 'MASTERCARD') DEFAULT NULL,
   rate DECIMAL(4,2) DEFAULT NULL,
   userId INT NOT NULL,
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
   );
    ```

4. **Inicia el servidor:**

    ```bash
    npm run dev
    ```

#### **Configurar el frontend**

1. **Navega a la carpeta del frontend:**

    ```bash
    cd client
    ```

2. **Instala las dependencias:**

    ```bash
    npm install
    ```

3. **Inicia la aplicación React:**

    ```bash
    npm start
    ```

    La aplicación debería estar corriendo en `http://localhost:5173`.

## **Uso**

1. Abre la aplicación en el navegador.
2. iniciar sesión con credenciales válida.
3. Administrar usuarios y gestionar sesiones.


## **Imagenes del Proyecto**

1. Inicio de Sesión.
   
![image](https://github.com/user-attachments/assets/b9a514a3-4a5d-44c1-a7b5-46f197e478ff)


2. interfaz del administrador.
   
![image](https://github.com/user-attachments/assets/331eea0f-1f6c-4ca9-b9f0-c557e6652cb5)
![image](https://github.com/user-attachments/assets/55d58822-c941-4b59-852e-d54ef4506b0b)
![image](https://github.com/user-attachments/assets/5fc6ee4f-5b91-4580-a936-109a39b36f23)



3. Interfaz del Asesro

  ![image](https://github.com/user-attachments/assets/f6962cb2-6524-4371-b2fc-09106e473c88)
  ![image](https://github.com/user-attachments/assets/004b9f14-fafe-490f-aa7c-f75063ba3bb8)
  ![image](https://github.com/user-attachments/assets/1afe00af-dfdf-4ea9-b797-e3a9e6e76822)




5. Contenedor de Docker con Imagen del Servidor, CLiente (frontend)y base de datos .
   





