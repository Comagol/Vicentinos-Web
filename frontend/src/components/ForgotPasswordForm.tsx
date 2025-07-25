import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  HStack,
  useToast,
  Link,
} from '@chakra-ui/react';
import loginService from '../services/LoginService';

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aquí iría la llamada al servicio
      // await loginService.forgotPassword({ email });
      
      // Por ahora, simulamo el envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEmailSent(true);
      toast({
        title: 'Email enviado',
        description: 'Revisa tu bandeja de entrada para recuperar tu contraseña',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Error al enviar el email',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <VStack spacing={6} textAlign="center">
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="primary" mb={2}>
            ¡Email enviado!
          </Text>
          <Text color="gray.600" fontSize="sm">
            Hemos enviado un enlace de recuperación a tu correo electrónico.
            Revisa tu bandeja de entrada y sigue las instrucciones.
          </Text>
        </Box>
        
        <Button
          w="full"
          size="lg"
          bg="primary"
          color="white"
          onClick={onSwitchToLogin}
          _hover={{
            bg: 'primary',
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          }}
        >
          Volver al inicio de sesión
        </Button>
      </VStack>
    );
  }

  return (
    <VStack spacing={6}>
      <Text color="gray.600" fontSize="sm" textAlign="center">
        Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu contraseña
      </Text>

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

          {/* Submit Button */}
          <Button
            type="submit"
            w="full"
            size="lg"
            bg="primary"
            color="white"
            isLoading={isLoading}
            loadingText="Enviando email..."
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
            Enviar email de recuperación
          </Button>
        </VStack>
      </form>

      {/* Back to Login */}
      <HStack justify="center" w="full">
        <Link
          color="primary"
          fontSize="sm"
          fontWeight="medium"
          onClick={onSwitchToLogin}
          _hover={{ textDecoration: 'underline' }}
        >
          ← Volver al inicio de sesión
        </Link>
      </HStack>
    </VStack>
  );
};

export default ForgotPasswordForm;