import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Textarea,
  Button,
  VStack,
  useToast,
  Container,
  Heading
} from '@chakra-ui/react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingrese un email válido';
    }

    // Validar teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Ingrese un teléfono válido';
    }

    // Validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Aquí puedes agregar la lógica para enviar el formulario
      // Por ejemplo, una llamada a tu API
      console.log('Datos del formulario:', formData);
      
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Mensaje enviado',
        description: 'Gracias por contactarnos. Te responderemos pronto.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un problema al enviar el mensaje. Inténtalo de nuevo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        border="1px"
        borderColor="gray.200"
      >
        <VStack spacing={6} align="stretch">
          <Heading
            as="h2"
            size="lg"
            color="primary"
            textAlign="center"
            mb={4}
          >
            Formulario de contacto
          </Heading>

          <form onSubmit={handleSubmit}>
            <VStack spacing={5} align="stretch">
              <FormControl isInvalid={!!errors.name}>
                <FormLabel color="primary" fontWeight="medium">
                  Nombre y apellido
                </FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ingrese su nombre completo"
                  bg="tertiary"
                  borderColor="gray.300"
                  _hover={{ borderColor: 'secondary' }}
                  _focus={{ borderColor: 'primary', boxShadow: 'outline' }}
                />
                <FormHelperText color="gray.600">
                  Ingrese su nombre completo
                </FormHelperText>
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel color="primary" fontWeight="medium">
                  E-mail
                </FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="ejemplo@email.com"
                  bg="tertiary"
                  borderColor="gray.300"
                  _hover={{ borderColor: 'secondary' }}
                  _focus={{ borderColor: 'primary', boxShadow: 'outline' }}
                />
                <FormHelperText color="gray.600">
                  Ingrese su dirección de email
                </FormHelperText>
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.phone}>
                <FormLabel color="primary" fontWeight="medium">
                  Teléfono
                </FormLabel>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(+54) 011 1234-5678"
                  bg="tertiary"
                  borderColor="gray.300"
                  _hover={{ borderColor: 'secondary' }}
                  _focus={{ borderColor: 'primary', boxShadow: 'outline' }}
                />
                <FormHelperText color="gray.600">
                  (+54) 011 1234-5678
                </FormHelperText>
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.message}>
                <FormLabel color="primary" fontWeight="medium">
                  Mensaje/Consulta
                </FormLabel>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Escriba su mensaje aquí..."
                  rows={5}
                  bg="tertiary"
                  borderColor="gray.300"
                  _hover={{ borderColor: 'secondary' }}
                  _focus={{ borderColor: 'primary', boxShadow: 'outline' }}
                />
                <FormHelperText color="gray.600">
                  Describa su consulta o mensaje
                </FormHelperText>
                <FormErrorMessage>{errors.message}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                bg="primary"
                color="white"
                size="lg"
                isLoading={isSubmitting}
                loadingText="Enviando..."
                _hover={{
                  bg: 'secondary',
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg'
                }}
                _active={{
                  transform: 'translateY(0)'
                }}
                transition="all 0.2s"
              >
                Contactar
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  );
};

export default ContactForm;