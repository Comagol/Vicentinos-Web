import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

type FormType = 'login' | 'register' | 'forgot-password';

const Login = () => {
  const [currentForm, setCurrentForm] = useState<FormType>('login');

  const handleSwitchToRegister = () => {
    setCurrentForm('register');
  };

  const handleSwitchToLogin = () => {
    setCurrentForm('login');
  };

  const handleSwitchToForgotPassword = () => {
    setCurrentForm('forgot-password');
  };

  const getFormTitle = () => {
    switch (currentForm) {
      case 'login':
        return 'Inicia sesión en tu cuenta';
      case 'register':
        return 'Crea tu cuenta';
      case 'forgot-password':
        return 'Recupera tu contraseña';
      default:
        return 'Inicia sesión en tu cuenta';
    }
  };

  const renderForm = () => {
    switch (currentForm) {
      case 'login':
        return (
          <LoginForm
            onSwitchToRegister={handleSwitchToRegister}
            onSwitchToForgotPassword={handleSwitchToForgotPassword}
          />
        );
      case 'register':
        return (
          <RegisterForm
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      default:
        return (
          <LoginForm
            onSwitchToRegister={handleSwitchToRegister}
            onSwitchToForgotPassword={handleSwitchToForgotPassword}
          />
        );
    }
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
                  src="/src/assets/logoT.png"
                  alt="Club Vicentinos Logo"
                  boxSize="80px"
                  mx="auto"
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
                  {getFormTitle()}
                </Text>
              </Box>
            </VStack>

            {/* Render the appropriate form */}
            {renderForm()}
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;