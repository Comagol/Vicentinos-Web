import CardMember from "../components/CardMember";
import { Box, Center, Flex, Text } from "@chakra-ui/react";

const MemberCard = () => {
  return (
    <Flex alignSelf="center">
      <Box>
      <Center margin="25px">
      <Text fontSize="large" color="primary.500" fontWeight="bold">Carnet de Socio</Text>
      </Center>
      <CardMember />
      </Box>
    </Flex>
  )
}

export default MemberCard