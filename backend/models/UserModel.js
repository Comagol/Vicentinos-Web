import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Datos de autenticación
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  
  // Datos personales del miembro
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  fechaNacimiento: { type: Date },
  telefono: { type: String },
  direccion: { type: String },
  
  // Datos del club
  numeroSocio: { type: String, unique: true, sparse: true },
  categoria: { type: String, default: "socio" },
  estado: { type: String, default: "activo" },
  fechaRegistro: { type: Date, default: Date.now },
  
  // Campos adicionales (opcionales)
  foto: { type: String },
  observaciones: { type: String },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware para actualizar updatedAt antes de guardar
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Método para generar número de socio automáticamente
userSchema.pre('save', async function(next) {
  if (this.isNew && !this.numeroSocio) {
    try {
      const count = await mongoose.model('User').countDocuments();
      this.numeroSocio = `CV${String(count + 1).padStart(4, '0')}`;
    } catch (error) {
      console.error('Error generando número de socio:', error);
    }
  }
  next();
});

// Método para obtener nombre completo
userSchema.virtual('nombreCompleto').get(function() {
  return `${this.nombre} ${this.apellido}`;
});

// Configurar para que las virtuals se incluyan en JSON
userSchema.set('toJSON', { virtuals: true });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;