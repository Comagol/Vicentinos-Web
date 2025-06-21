import Logo from '../assets/logo.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Box, Image, Text, Link as ChakraLink } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="primary" px={4} color="white" boxShadow="sm" py={4} display="flex" alignItems="center" gap={4} justifyContent="space-between">
        <Image src={Logo} alt="logo" h="44px" />
        <Box display="flex" flexDirection="column" gap={2}>
          <Text>Copyright 2025 Club Vicentinos</Text>
          <Text>Todos los derechos reservados</Text>
        </Box>
      <Box display="flex" gap={5} alignItems="center">
      <ChakraLink href="https://www.instagram.com/clubvicentinos/?hl=es" target='_blank'>
        <FontAwesomeIcon icon={faInstagram} />
      </ChakraLink>
      <ChakraLink href="https://www.facebook.com/clubvicentinos/?locale=es_LA" target='_blank' rel='noopener noreferrer'>
        <FontAwesomeIcon icon={faFacebook} />
      </ChakraLink>
        </Box>
    </Box>
  );
};

export default Footer;