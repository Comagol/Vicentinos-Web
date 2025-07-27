import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  HStack,
  useToast,
  IconButton,
  Link,
  Flex,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSwitchToRegister, 
  onSwitchToForgotPassword 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  
  // Usar el contexto de autenticación
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Iniciando login...'); // Debug log
    setIsLoading(true);

    try {
      console.log('Llamando a login con:', { email, password }); // Debug log
      
      // Usar la función login del contexto en lugar del servicio directamente
      await login(email, password);
      
      console.log('Login exitoso!'); // Debug log
      
      toast({
        title: '¡Bienvenido!',
        description: 'Has iniciado sesión correctamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/');
    } catch (error: any) {
      console.error('Error en login:', error); // Debug log
      toast({
        title: 'Error al iniciar sesión',
        description: error.response?.data?.message || 'Credenciales incorrectas',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast({
      title: 'Iniciando sesión con Google...',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={6}>
      {/* Google Login Button */}
      <Button
        w="full"
        size="lg"
        variant="outline"
        leftIcon={<FontAwesomeIcon icon={faGoogle} />}
        onClick={handleGoogleLogin}
        _hover={{
          bg: 'gray.50',
          borderColor: 'gray.300',
        }}
      >
        Continuar con Google
      </Button>

      <HStack w="full">
        <Box flex="1" h="1px" bg="gray.300" />
        <Text fontSize="sm" color="gray.500" px={4}>
          o continúa con
        </Text>
        <Box flex="1" h="1px" bg="gray.300" />
      </HStack>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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

          {/* Forgot Password Link */}
          <Flex w="full" justify="flex-end">
            <Link
              color="primary"
              fontSize="sm"
              fontWeight="medium"
              onClick={onSwitchToForgotPassword}
              _hover={{ textDecoration: 'underline' }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Flex>

          {/* Submit Button */}
          <Button
            type="submit"
            w="full"
            size="lg"
            bg="primary"
            color="white"
            isLoading={isLoading}
            loadingText="Iniciando sesión..."
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
            Iniciar sesión
          </Button>
        </VStack>
      </form>

      {/* Toggle to Register */}
      <HStack justify="center" w="full">
        <Text color="gray.600" fontSize="sm">
          ¿No tienes una cuenta?
        </Text>
        <Link
          color="primary"
          fontSize="sm"
          fontWeight="medium"
          onClick={onSwitchToRegister}
          _hover={{ textDecoration: 'underline' }}
        >
          Regístrate
        </Link>
      </HStack>
    </VStack>
  );
};

export default LoginForm;