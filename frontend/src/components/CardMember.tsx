import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  VStack,
  useBreakpointValue,
  Card,
  CardBody,
  Badge,
  Divider
} from '@chakra-ui/react';

interface CardMemberProps {
  memberType?: string;
  paymentStatus?: string;
  memberImage?: string;
  memberName?: string;
  memberId?: string;
  onPayFee?: () => void;
}

const CardMember: React.FC<CardMemberProps> = ({
  memberType = "Socio Activo",
  paymentStatus = "Al día",
  memberImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMK2J4dfHECS-HsqJlZDf_xu5qtMR_VKT4Mg&s",
  memberName = "John Doe",
  memberId = "1234567890",
  onPayFee
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Card 
      maxW="400px" 
      w="100%" 
      bg="white" 
      boxShadow="lg" 
      borderRadius="xl"
      border="2px solid"
      borderColor="primary"
      justifySelf="center"
      marginTop="50px"
    >
      <CardBody p={6} bgColor="softBlue" borderRadius="10px">
        <VStack spacing={4} align="stretch" >
          {/* Header */}
          <Box textAlign="center" pb={2}>
            <Text 
              fontSize="large" 
              fontWeight="bold" 
              color="accent"
              fontFamily="heading"
            >
              Carnet Socio
            </Text>
          </Box>

          <Divider borderColor="primary" />

          {/* Content */}
          <Flex 
            direction={isMobile ? "column" : "row"} 
            gap={4} 
            align="stretch"
          >
            {/* Left side - Member Info */}
            <VStack 
              flex={1} 
              spacing={3} 
              align="stretch"
              minW={isMobile ? "auto" : "200px"}
            >
              <Box>
                <Text 
                  fontSize="medium" 
                  fontWeight="semibold" 
                  color="primary"
                  fontFamily="body"
                >
                  Tipo de Socio:
                </Text>
                <Text 
                  fontSize="medium" 
                  color="gray.700"
                  fontFamily="body"
                >
                  {memberType}
                </Text>
              </Box>

              <Box>
                <Text 
                  fontSize="medium" 
                  fontWeight="semibold" 
                  color="primary"
                  fontFamily="body"
                >
                  Estado de la cuota:
                </Text>
                <Badge 
                  colorScheme={paymentStatus === "Al día" ? "green" : "red"}
                  fontSize="small"
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  {paymentStatus}
                </Badge>
              </Box>

              <Box>
                <Text 
                  fontSize="medium" 
                  fontWeight="semibold" 
                  color="primary"
                  fontFamily="body"
                >
                  Nombre:
                </Text>
                <Text 
                  fontSize="medium" 
                  color="gray.700"
                  fontFamily="body"
                >
                  {memberName}
                </Text>
              </Box>

              <Box>
                <Text 
                  fontSize="medium" 
                  fontWeight="semibold" 
                  color="primary"
                  fontFamily="body"
                >
                  ID Socio:
                </Text>
                <Text 
                  fontSize="small" 
                  color="gray.600"
                  fontFamily="body"
                >
                  {memberId}
                </Text>
              </Box>

              <Button
                variant="solid"
                size="md"
                bg="secondary"
                color="white"
                _hover={{ bg: "primary", color: "white" }}
                _active={{ bg: "primary" }}
                fontWeight="bold"
                onClick={onPayFee}
                mt={2}
              >
                Pagar Cuota
              </Button>
            </VStack>

            {/* Right side - Member Image */}
            <VStack 
              flex={1} 
              spacing={3} 
              align="center"
              justify="center"
            >
              <Box 
                w="120px" 
                h="120px" 
                borderRadius="full" 
                overflow="hidden"
                border="3px solid"
                borderColor="primary"
                bg="tertiary"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {memberImage ? (
                  <Image 
                    src={memberImage} 
                    alt="Foto del socio"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                ) : (
                  <Text 
                    fontSize="small" 
                    color="gray.500"
                    textAlign="center"
                    fontFamily="body"
                  >
                    {memberName}
                  </Text>
                )}
              </Box>
    
              <Box>
                <Text color="primary" opacity="0.9">
                  Club Vicentinos
                </Text>
              </Box>
            </VStack>
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default CardMember;
