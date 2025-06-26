import { VStack, Heading, Text, Box } from "@chakra-ui/react"


const Home = () => {
  return (
  <VStack spacing={6} p={8}>
    <Heading color="primary.500" fontSize="4xl" fontWeight="bold">Club Vicentinos Hockey y Rugby</Heading>
    <Box>
      <Heading>
        Nuestra ubicación
      </Heading>
      <Text>
        Te invitamos a conocer nuestras instalaciones.
      </Text>
      <Box w="full" h="400px" borderRadius="lg" overflow="hidden" boxShadow="lg" border="1px solid" borderColor="gray.200">
      <iframe
            src="https://www.google.com.ar/maps/place/Club+Vicentinos+Hockey+y+Rugby/@-34.5483383,-58.7417128,17z/data=!3m1!4b1!4m6!3m5!1s0x95bc97d852255be5:0xb2683f04d9c04890!8m2!3d-34.5483383!4d-58.7391379!16s%2Fg%2F11b8v9rs5m?hl=es&entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D"
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