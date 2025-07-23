import CardMember from "../components/CardMember";
import { Center, Flex, Text } from "@chakra-ui/react";

const MemberCard = () => {
  return (
    <Flex alignSelf="center">
      <Center>
      <Text fontSize="large">Carnet de Socio</Text>
      </Center>
      <CardMember />
    </Flex>
  )
}

export default MemberCard