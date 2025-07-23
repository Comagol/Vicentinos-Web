import CardMember from "../components/CardMember";
import { Flex, Text } from "@chakra-ui/react";

const MemberCard = () => {
  return (
    <Flex alignSelf="center">
      <Text>Carnet de Socio</Text>
      <CardMember />
    </Flex>
  )
}

export default MemberCard