import { useEffect, useState } from "react";
import { Box, Flex, IconButton, useDisclosure, Button, Image, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "../assets/logoT.png";
import axios from "axios";

// Defino el tipo para los links
interface NavLink {
  name: string;
  path: string;
}

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [links, setLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    axios.get("/api/nav-links", { withCredentials: true })
      .then(res => {
        console.log("Links recibidos:", res.data);
        setLinks(res.data);
      })
      .catch((err) => {
        console.error("Error obteniendo links:", err);
        setLinks([]);
      });
  }, []);

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
            {Array.isArray(links) && links.map((link) => (
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