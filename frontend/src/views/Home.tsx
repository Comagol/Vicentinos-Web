import { VStack, Heading, Text, Box } from "@chakra-ui/react"


const Home = () => {
  return (
  <VStack spacing={6} p={8}>
    <Heading color="primary.500" fontSize="4xl" fontWeight="bold">Club Vicentinos Hockey y Rugby</Heading>
    <Box>
      <Heading color="primary.500" fontSize="4xl" fontWeight="bold" textAlign="center" p={4}>
        Nuestra historia
      </Heading>
      <Text p={4}>
        Somos un club deportivo que se dedica a la práctica del hockey y el rugby. Donde nuestra principal tarea es la formacion de personas con valores y principios. Dejando amistades para toda la vida. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe fugiat nihil ipsam dignissimos amet, officia tenetur necessitatibus asperiores, ratione ad at iste nesciunt, ducimus magnam impedit hic praesentium commodi ut.
      </Text>
    </Box>
    <Box>
      <Heading>
        Nuestra ubicación
      </Heading>
      <Text>
        Te invitamos a conocer nuestras instalaciones.
      </Text>
      <Box w="full" h="400px" borderRadius="lg" overflow="hidden" boxShadow="lg" border="1px solid" borderColor="gray.200">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.2060393370016!2d-58.74171282462192!3d-34.54833827297415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc97d852255be5%3A0xb2683f04d9c04890!2sClub%20Vicentinos%20Hockey%20y%20Rugby!5e0!3m2!1ses!2sar!4v1750974908288!5m2!1ses!2sar"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación del Club Vicentinos"
      />
      </Box>
      <Text>
        Dirección: Av Primera Junta 3369, San Miguel, Buenos Aires, Argentina
      </Text>
    </Box>
  </VStack>
  )
}

export default Home