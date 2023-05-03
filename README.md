# Monlau GitHub (WIP)
Monlau GitHub es una plataforma web desarrollada para que los alumnos del centro de estudios Monlau puedan subir sus proyectos de código y compartirlos con otros estudiantes y visitantes externos. La plataforma les permite iniciar sesión a través de OAuth de GitHub y registrar sus proyectos, aunque en el propio espacio de usuario también . Además, se puede vincular su cuenta de LinkedIn para dar a conocer su perfil profesional.

### Tecnologías utilizadas

#### T3 stack

El stack T3 es un conjunto de herramientas de desarrollo web creado por Theo que se enfoca en la simplicidad, modularidad y seguridad de tipo de pila completa. Es un conjunto de bibliotecas y frameworks que defienden una metodología específica para construir aplicaciones web modernas. T3 es una colección de herramientas para implementar aplicaciones fullstack con TypeScript.


- **Next.js**: Framework de React para desarrollar aplicaciones web del lado del servidor (SSR) o del lado del cliente (CSR) con enrutamiento dinámico, optimización de rendimiento, soporte para TypeScript y una amplia comunidad de desarrolladores.
- **Prisma**: ORM que permite acceder a las bases de datos de forma fácil y segura, con modelado de datos declarativo, generación de tipos de TypeScript, seguridad y flexibilidad para trabajar con diferentes bases de datos.
- **tRPC**: Herramienta para construir APIs de forma sencilla y segura, con tipado estático, generación de código de cliente y servidor, gestión de errores y soporte para diferentes protocolos.
- **Clerk**: Herramienta que simplifica la autenticación y gestión de sesiones de usuario, con OAuth integrado, gestión de sesiones, seguridad y personalización.

#### CockroachDB

En Monlau GitHub, los datos de los proyectos se almacenan en una base de datos llamada CockroachDB. CockroachDB es una base de datos SQL distribuida que se ejecuta en clústeres de múltiples nodos y proporciona un almacenamiento consistente y tolerante a fallos. Además, su integración con Prisma permite un acceso seguro y sencillo a la base de datos desde la aplicación web.
