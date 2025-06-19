## Índice

* [Repositorios](#repositorios)
* [Manuales de usuario](#manuales-de-usuario)
* [Aspectos generales](#aspectos-generales)

  * [Objetivos del Documento](#objetivos-del-documento)
  * [Descripción General](#descripción-general)
  * [Requerimientos del Sistema](#requerimientos-del-sistema)
  * [Software utilizado:](#software-utilizado)
* [Arquitectura del Sistema](#arquitectura-del-sistema)

  * [Patrones de diseño](#patrones-de-diseño)
  * [Diagrama de modelo de datos](#diagrama-de-modelo-de-datos)
* [Guía de configuración](#guía-de-configuración)

  * [Configuración para el front end del sistema](#configuración-para-el-front-end-del-sistema)
  * [Configuración para el back end del sistema](#configuración-para-el-back-end-del-sistema)
* [Compatibilidad de licencias](#compatibilidad-de-licencias)
* [Tipos de error](#tipos-de-error)
* [Tablero](#tablero)
* [Chat Integrado](#chat-integrado)

...

## Chat Integrado

El chat grupal forma parte integral de ElephanTalk y se compone de tres servicios:

1. **Backend** (`Backend/`): servidor Express con soporte para Socket.IO. Publica la aplicación de React y reenvía cada mensaje al servicio de moderación antes de emitirlo a los usuarios conectados.
2. **Moderation** (`Moderation/`): servicio FastAPI que analiza los mensajes y bloquea aquellos que contienen palabras prohibidas.
3. **Frontend** (`Frontend/`): interfaz React ligera que se conecta al backend mediante Socket.IO.

### Ejecución local

1. Instala las dependencias del backend y arranca el servidor (sirve la interfaz React desde `Frontend/`):

```bash
cd Backend
npm install
npm start
```

2. En otra terminal, instala las dependencias del servicio de moderación y ejecútalo:

```bash
cd Moderation
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

3. Abre `http://localhost:3000` en tu navegador y comparte mensajes en tiempo real.

Cada mensaje se envía primero al servicio de moderación; si es aceptado, se difunde a todos los participantes del chat.

### Pruebas automatizadas

Ejecuta `npm test` en `Backend/` y `pytest` en `Moderation/` para validar el funcionamiento.
