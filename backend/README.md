# Club Vicentinos - Backend API

Backend API para la aplicación web del Club Vicentinos, construido con Node.js, Express y MongoDB.

## 🚀 Características

- **RESTful API** con Express.js
- **Base de datos MongoDB** con Mongoose ODM
- **Seguridad** con Helmet y CORS configurado
- **Logging** con Morgan
- **Manejo de errores** centralizado
- **Variables de entorno** con dotenv

## 📁 Estructura del Proyecto

```
backend/
├── config/
│   └── database.js          # Configuración de MongoDB
├── controllers/
│   ├── memberController.js  # Controlador de miembros
│   └── newsController.js    # Controlador de noticias
├── middleware/
│   └── errorHandler.js      # Manejo de errores
├── models/
│   ├── Member.js           # Modelo de miembros
│   └── News.js             # Modelo de noticias
├── routes/
│   ├── memberRoutes.js     # Rutas de miembros
│   └── newsRoutes.js       # Rutas de noticias
├── server.js               # Archivo principal
├── package.json
└── README.md
```

## 🛠️ Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp env.example .env
   ```
   Editar el archivo `.env` con tus configuraciones.

3. **Iniciar el servidor:**
   ```bash
   # Desarrollo (con nodemon)
   npm run dev
   
   # Producción
   npm start
   ```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` basado en `env.example`:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/club-vicentinos
FRONTEND_URL=http://localhost:5173
```

### Base de Datos

Asegúrate de tener MongoDB instalado y ejecutándose localmente, o usa MongoDB Atlas.

## 📡 Endpoints de la API

### Miembros (`/api/members`)

- `GET /` - Obtener todos los miembros (con paginación)
- `GET /search?q=term` - Buscar miembros
- `GET /:id` - Obtener miembro por ID
- `POST /` - Crear nuevo miembro
- `PUT /:id` - Actualizar miembro
- `DELETE /:id` - Eliminar miembro

### Noticias (`/api/news`)

- `GET /` - Obtener todas las noticias publicadas
- `GET /featured` - Obtener noticias destacadas
- `GET /search?q=term` - Buscar noticias
- `GET /:id` - Obtener noticia por ID
- `POST /` - Crear nueva noticia
- `PUT /:id` - Actualizar noticia
- `DELETE /:id` - Eliminar noticia
- `PATCH /:id/publish` - Publicar/despublicar noticia

### Utilidades

- `GET /` - Información de la API
- `GET /health` - Health check

## 🗄️ Modelos de Datos

### Member
- `name` (String, requerido)
- `email` (String, requerido, único)
- `phone` (String)
- `membershipNumber` (String, requerido, único)
- `joinDate` (Date, automático)
- `status` (Enum: active, inactive, pending)
- `role` (Enum: member, admin, moderator)
- `profileImage` (String)
- `address` (Object)
- `emergencyContact` (Object)

### News
- `title` (String, requerido)
- `content` (String, requerido)
- `summary` (String)
- `author` (ObjectId, referencia a Member)
- `category` (Enum: general, events, announcements, sports, social)
- `tags` (Array de Strings)
- `image` (String)
- `isPublished` (Boolean)
- `publishDate` (Date)
- `views` (Number)
- `featured` (Boolean)

## 🔒 Seguridad

- **Helmet**: Headers de seguridad HTTP
- **CORS**: Configurado para el frontend
- **Validación**: Mongoose schema validation
- **Sanitización**: Express middleware

## 🚀 Scripts Disponibles

- `npm start` - Iniciar servidor en producción
- `npm run dev` - Iniciar servidor en desarrollo (con nodemon)
- `npm test` - Ejecutar tests (pendiente)

## 📝 Próximas Características

- [ ] Autenticación JWT
- [ ] Subida de archivos
- [ ] Envío de emails
- [ ] Tests unitarios
- [ ] Documentación con Swagger
- [ ] Rate limiting
- [ ] Cache con Redis

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. 