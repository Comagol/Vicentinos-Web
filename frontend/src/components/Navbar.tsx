import { useEffect, useState } from "react";
import { Box, Flex, IconButton, useDisclosure, Button, Image, Stack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "../assets/logoT.png";
import { useAuth } from "../context/AuthContext";

// Defino el tipo para los links
interface NavLink {
  name: string;
  path: string;
}

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [links, setLinks] = useState<NavLink[]>([]);
  const navigate = useNavigate();
  
  // Usar el contexto de autenticación
  const { isAuthenticated, user, logout } = useAuth();

  // Función para generar los links basados en el estado de autenticación
  const generateNavLinks = () => {
    const baseLinks: NavLink[] = [
      { name: "Inicio", path: "/" },
      { name: "Contacto", path: "/contact" },
      { name: "Noticias", path: "/news" }
    ];

    if (isAuthenticated && user) {
      // Usuario autenticado
      baseLinks.push({ name: "Carnet de Socio", path: "/member-card" });
      
      // Si es admin, agregar links de administración
      if (user.role === "admin") {
        baseLinks.push({ name: "Panel Admin", path: "/admin/members" });
      }
      
      // Agregar botón de logout (se maneja con onClick)
      baseLinks.push({ name: "Cerrar Sesión", path: "#logout" });
    } else {
      // Usuario no autenticado
      baseLinks.push({ name: "Iniciar Sesión", path: "/login" });
    }

    return baseLinks;
  };

  // Actualizar links cuando cambie el estado de autenticación
  useEffect(() => {
    setLinks(generateNavLinks());
  }, [isAuthenticated, user]);

  // Manejar el logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

  // Manejar clic en links
  const handleLinkClick = (link: NavLink) => {
    if (link.path === "#logout") {
      handleLogout();
    } else {
      navigate(link.path);
    }
    onClose(); // Cerrar menú móvil si está abierto
  };

  return (
    <Box bg="primary" px={4} color="white" boxShadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Link to="/">
          <Image src={Logo} alt="logo" h="44px" />
        </Link>

        {/* Desktop menu */}
        <Flex as="nav" gap={2} display={{ base: "none", md: "flex" }}>
          {Array.isArray(links) && links.map((link) => (
            <Button
              key={link.path}
              variant="ghost"
              color="white"
              _hover={{ bg: "secondary", color: "primary" }}
              fontWeight="bold"
              onClick={() => handleLinkClick(link)}
            >
              {link.name}
            </Button>
          ))}
        </Flex>

        {/* Mobile menu button */}
        <IconButton
          aria-label="Open Menu"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          color="white"
          bg="primary"
          _hover={{ bg: "secondary", color: "primary" }}
        />
      </Flex>

      {/* Mobile menu */}
      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={1}>
            {Array.isArray(links) && links.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                color="white"
                _hover={{ bg: "secondary", color: "primary" }}
                fontWeight="bold"
                w="100%"
                justifyContent="flex-start"
                onClick={() => handleLinkClick(link)}
              >
                {link.name}
              </Button>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;