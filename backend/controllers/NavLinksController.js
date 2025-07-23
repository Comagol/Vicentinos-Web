class NavLinksController {
  
  getNavLinks(req,res) {
    //Links publicos...
    let links = [
    { name: "Inicio", path:"/"},
    { name: "Contacto", path:"/contact"},
    { name: "Noticias", path:"/news"}
    ];

    //Empiezo con las validaciones de si esta autenticado...
    if (req.user) {
      links.push({ name: "Logout", path: "/logout"});

      //Si es Admin le agrego links...
      if (req.user.role === "admin") {
        links.push({ name: "Panel de administrador", path: "/admin/members"})
      }
    } else {
      links.push({ name: "inicio Sesion", path: "/login"});
    }

    res.json(links);
  }
}

export default new NavLinksController();