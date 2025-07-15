//Controlador para el login

class LoginController {
  //Metodo para el login
  async login(req, res) {
    try {
      const { email, password } = req.body;
    } catch (error) {
      res.status(500).json({ message: "Error al iniciar sesión" });
    }
  }
}