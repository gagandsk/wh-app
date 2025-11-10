# Wheelhub App

¡Hola! Este repo es mi entrega para la prueba técnica Wheelhub. Lo he desarrollado desde cero, intentando mantenerlo sencillo y modular para que sea fácil de revisar y modificar.

## Estructura del proyecto

El repo está dividido en el *frontend* y el *backend*:

**backend:**

* **Express**
* **TypeScript** para tipado y desarrollo.
* **Express Validator**
* **MySQL2** y **TypeORM** para la base de datos.
* **UUID** para la gestión de identificadores únicos.

**frontend:**

* **React**
* **Vite:** para el desarrollo y build rápido del proyecto.
* **React Router DOM**
* **Axios**
* **React Icons**
* **TypeScript**

<br>
* *La estructura puede parecer minimalista,  para la demo me enfoqué solo en lo necesario.*

## ¿Cómo levantarlo?

**Backend**

``` bash
cd backend
# Instala dependencias
npm install
# Ejecuta localmente
npm run dev
```

**Frontend**

``` bash
cd frontend
npm install
npm run dev
```

## Cosas que no pude terminar

* Dockerizar el proyecto
* Algunas validaciones extra en el backend.
* La funcionalidad de *editar* (está a medias)
* Mejoras visuales en el frontend (hay detalles que se pueden mejorar en la UI), como por ejemplo hacerlo responsive.
* Implementar Tests unitarios y funcionales

- - -

<br>
<br>
