import { Box, Flex, IconButton, useDisclosure, Button, Image, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "../assets/logoT.png";

const links = [
  { name: "Inicio", path: "/" },
  { name: "Contacto", path: "/contact" },
  { name: "Carnet de Socio", path: "/member-card" },
  { name: "Noticias", path: "/news" },
  { name: "Inicio Sesion", path: "/login"},
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="primary" px={4} color="white" boxShadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Link to="/">
          <Image src={Logo} alt="logo" h="44px" />
        </Link>

        {/* Desktop menu */}
        <Flex as="nav" gap={2} display={{ base: "none", md: "flex" }}>
          {links.map((link) => (
            <Button
              as={Link}
              to={link.path}
              key={link.path}
              variant="ghost"
              color="white"
              _hover={{ bg: "secondary", color: "primary" }}
              fontWeight="bold"
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
            {links.map((link) => (
              <Button
                as={Link}
                to={link.path}
                key={link.path}
                variant="ghost"
                color="white"
                _hover={{ bg: "secondary", color: "primary" }}
                fontWeight="bold"
                w="100%"
                justifyContent="flex-start"
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