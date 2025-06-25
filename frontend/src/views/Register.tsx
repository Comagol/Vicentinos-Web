import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  HStack,
  Heading,
  useToast,
  Card,
  CardBody,
  IconButton,
  Link,
  Image,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica de registro
    toast({
      title: 'Registrando usuario...',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleGoogleRegister = () => {
    // Aquí irá la lógica de registro con Google
    toast({
      title: 'Registrando con Google...',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, primary 0%, secondary 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={8}
    >
      <Container maxW="md">
        <Card
          bg="white"
          borderRadius="xl"
          boxShadow="2xl"
          overflow="hidden"
        >
          <CardBody p={8}>
            {/* Header */}
            <VStack spacing={6} mb={8}>
              <Box textAlign="center">
                <Image
                  src="/src/assets/logo.jpg"
                  alt="Club Vicentinos Logo"
                  boxSize="80px"
                  mx="auto"
                  borderRadius="full"
                  objectFit="cover"
                  fallbackSrc="https://via.placeholder.com/80x80/073362/FFFFFF?text=CV"
                />
                <Heading
                  size="lg"
                  color="primary"
                  mt={4}
                  fontWeight="bold"
                >
                  Club Vicentinos
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  Crea tu cuenta
                </Text>
              </Box>
            </VStack>

            {/* Google Register Button */}
            <Button
              w="full"
              size="lg"
              variant="outline"
              leftIcon={<FontAwesomeIcon icon={faGoogle} />}
              onClick={handleGoogleRegister}
              mb={6}
              _hover={{
                bg: 'gray.50',
                borderColor: 'gray.300',
              }}
            >
              Registrarse con Google
            </Button>

            <HStack my={6}>
              <Divider />
              <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
                o regístrate con
              </Text>
              <Divider />
            </HStack>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color="gray.700" fontSize="sm" fontWeight="medium">
                    Correo electrónico
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                    borderRadius="md"
                    _focus={{
                      borderColor: 'primary',
                      boxShadow: '0 0 0 1px var(--chakra-colors-primary)',
                    }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="gray.700" fontSize="sm" fontWeight="medium">
                    Contraseña
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      borderRadius="md"
                      _focus={{
                        borderColor: 'primary',
                        boxShadow: '0 0 0 1px var(--chakra-colors-primary)',
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="gray.700" fontSize="sm" fontWeight="medium">
                    Confirmar contraseña
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      borderRadius="md"
                      _focus={{
                        borderColor: 'primary',
                        boxShadow: '0 0 0 1px var(--chakra-colors-primary)',
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                {/* Submit Button */}
                <Button
                  type="submit"
                  w="full"
                  size="lg"
                  bg="primary"
                  color="white"
                  _hover={{
                    bg: 'primary',
                    transform: 'translateY(-1px)',
                    boxShadow: 'lg',
                  }}
                  _active={{
                    bg: 'primary',
                    transform: 'translateY(0)',
                  }}
                  mt={4}
                >
                  Crear cuenta
                </Button>
              </VStack>
            </form>

            {/* Toggle to Login */}
            <HStack justify="center" mt={6}>
              <Text color="gray.600" fontSize="sm">
                ¿Ya tienes una cuenta?
              </Text>
              <Link
                color="primary"
                fontSize="sm"
                fontWeight="medium"
                href="/login"
                _hover={{ textDecoration: 'underline' }}
              >
                Inicia sesión
              </Link>
            </HStack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;
