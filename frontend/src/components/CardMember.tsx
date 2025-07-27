import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardBody,
  VStack,
  Text,
  Heading,
  Button,
  useToast,
  Spinner,
  Center,
  Badge,
  Divider,
} from '@chakra-ui/react';
import memberService from '../services/memberService';
import type { MemberData } from '../services/memberService';

const CardMember = () => {
  const [member, setMember] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    loadMemberData();
  }, []);

  const loadMemberData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await memberService.getCurrentMember();
      setMember(response.member);
      
    } catch (error: any) {
      console.error('Error cargando datos del miembro:', error);
      setError(error.response?.data?.message || 'Error al cargar los datos');
      
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los datos del miembro',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'red';
      case 'user':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'user':
        return 'Socio';
      default:
        return role;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No especificada';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Center py={8}>
        <VStack spacing={4}>
          <Spinner size="xl" color="primary" />
          <Text>Cargando información del socio...</Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Card>
        <CardBody>
          <VStack spacing={4}>
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
            <Button onClick={loadMemberData} colorScheme="blue">
              Reintentar
            </Button>
          </VStack>
        </CardBody>
      </Card>
    );
  }

  return (
    <VStack spacing={6}>
      {/* Header */}
      <VStack spacing={2}>
        <Heading size="lg" color="primary">
          Carnet de Socio
        </Heading>
        <Text color="gray.600" textAlign="center">
          Club Vicentinos
        </Text>
      </VStack>

      {/* Member Card */}
      <Card w="full" borderRadius="xl" boxShadow="xl" overflow="hidden">
        <CardBody p={8}>
          <VStack spacing={6} align="stretch">
            {/* Member Info */}
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold" fontSize="lg" color="primary">
                Información Personal
              </Text>
              
              {/* Nombre Completo */}
              <Box>
                <Text color="gray.600" fontSize="sm" mb={1}>
                  Nombre Completo
                </Text>
                <Text fontWeight="bold" fontSize="md">
                  {member?.nombreCompleto}
                </Text>
              </Box>

              {/* Email */}
              <Box>
                <Text color="gray.600" fontSize="sm" mb={1}>
                  Email
                </Text>
                <Text fontWeight="medium">{member?.email}</Text>
              </Box>

              {/* Teléfono */}
              {member?.telefono && (
                <Box>
                  <Text color="gray.600" fontSize="sm" mb={1}>
                    Teléfono
                  </Text>
                  <Text fontWeight="medium">{member.telefono}</Text>
                </Box>
              )}

              {/* Dirección */}
              {member?.direccion && (
                <Box>
                  <Text color="gray.600" fontSize="sm" mb={1}>
                    Dirección
                  </Text>
                  <Text fontWeight="medium">{member.direccion}</Text>
                </Box>
              )}

              {/* Fecha de Nacimiento */}
              {member?.fechaNacimiento && (
                <Box>
                  <Text color="gray.600" fontSize="sm" mb={1}>
                    Fecha de Nacimiento
                  </Text>
                  <Text fontWeight="medium">{formatDate(member.fechaNacimiento)}</Text>
                </Box>
              )}

              {/* Número de Socio */}
              <Box>
                <Text color="gray.600" fontSize="sm" mb={1}>
                  Número de Socio
                </Text>
                <Text fontWeight="bold" color="primary" fontSize="lg">
                  {member?.numeroSocio}
                </Text>
              </Box>

              {/* Rol */}
              <Box>
                <Text color="gray.600" fontSize="sm" mb={1}>
                  Rol
                </Text>
                <Badge 
                  colorScheme={getRoleBadgeColor(member?.role || '')}
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {getRoleDisplayName(member?.role || '')}
                </Badge>
              </Box>
            </VStack>

            <Divider />

            {/* Fecha de Registro */}
            <Box>
              <Text color="gray.600" fontSize="sm" mb={1}>
                Fecha de Registro
              </Text>
              <Text fontFamily="mono" fontSize="sm" color="gray.500">
                {formatDate(member?.fechaRegistro || '')}
              </Text>
            </Box>

            {/* Actions */}
            <VStack spacing={3} pt={2}>
              <Button
                colorScheme="blue"
                variant="outline"
                w="full"
                onClick={() => {
                  toast({
                    title: 'Función en desarrollo',
                    description: 'La edición de perfil estará disponible pronto',
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              >
                Editar Perfil
              </Button>
            </VStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Additional Info */}
      <Card w="full" borderRadius="lg">
        <CardBody>
          <VStack spacing={3} align="stretch">
            <Text fontWeight="bold" color="primary">
              Beneficios del Socio
            </Text>
            <VStack spacing={2} align="stretch">
              <Text fontSize="sm" color="gray.600">
                • Acceso a todas las actividades del club
              </Text>
              <Text fontSize="sm" color="gray.600">
                • Descuentos en eventos especiales
              </Text>
              <Text fontSize="sm" color="gray.600">
                • Participación en torneos internos
              </Text>
              <Text fontSize="sm" color="gray.600">
                • Acceso a instalaciones exclusivas
              </Text>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default CardMember;