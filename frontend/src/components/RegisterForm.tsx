import React, { useState } from 'react';
import {
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
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import loginService from '../services/LoginService';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Las contraseñas no coinciden',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      await loginService.register({ 
        email, 
        password, 
        nombre, 
        apellido, 
        telefono, 
        direccion, 
        fechaNacimiento 
      });
      
      toast({
        title: '¡Registro exitoso!',
        description: 'Tu cuenta ha sido creada correctamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onSwitchToLogin();
    } catch (error: any) {
      toast({
        title: 'Error al registrarse',
        description: error.response?.data?.message || 'Error en el servidor',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={6}>
      <Text color="gray.600" fontSize="sm" textAlign="center">
        Crea tu cuenta para acceder a todas las funcionalidades
      </Text>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <VStack spacing={4}>
          {/* Nombre y Apellido */}
          <HStack spacing={4} w="full">
            <FormControl isRequired>
              <FormLabel color="gray.700" fontSize="sm" fontWeight="medium">
                Nombre
              </FormLabel>
              <Input
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
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
                Apellido
              </FormLabel>
              <Input
                placeholder="Tu apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                size="lg"
                borderRadius="md"
                _focus={{
                  borderColor: 'primary',
                  boxShadow: '0 0 0 1px var(--chakra-colors-primary)',
                }}
              />
            </FormControl>
          </HStack>

          {/* Email */}
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

          {/* Teléfono y Fecha de Nacimiento */}
          <HStack spacing={4} w="full">
            <FormControl>
              <FormLabel color="gray.700" fontSize="sm" fontWeight="medium">
                Teléfono
              </FormLabel>
              <Input
                placeholder="Tu teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                size="lg"
                borderRadius="md"
                _focus={{
                  borderColor: 'primary',
                  boxShadow: '0 0 0 1px var(--chakra-colors-primary)',
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="gray.700" fontSize="sm" fontWeight="medium">
                Fecha de Nacimiento
              </FormLabel>
              <Input
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                size="lg"
                borderRadius="md"
                _focus={{
                  borderColor: 'primary',
                  boxShadow: '0 0 0 1px var(--chakra-colors-primary)',
                }}
              />
            </FormControl>
          </HStack>

          {/* Dirección */}
          <FormControl>
            <FormLabel color="gray.700" fontSize="sm" fontWeight="medium">
              Dirección
            </FormLabel>
            <Input
              placeholder="Tu dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              size="lg"
              borderRadius="md"
              _focus={{
                borderColor: 'primary',
                boxShadow: '0 0 0 1px var(--chakra-colors-primary)',
              }}
            />
          </FormControl>

          {/* Contraseñas */}
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
            isLoading={isLoading}
            loadingText="Creando cuenta..."
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
      <HStack justify="center" w="full">
        <Text color="gray.600" fontSize="sm">
          ¿Ya tienes una cuenta?
        </Text>
        <Link
          color="primary"
          fontSize="sm"
          fontWeight="medium"
          onClick={onSwitchToLogin}
          _hover={{ textDecoration: 'underline' }}
        >
          Inicia sesión
        </Link>
      </HStack>
    </VStack>
  );
};

export default RegisterForm;