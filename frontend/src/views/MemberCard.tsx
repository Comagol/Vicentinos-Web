import {
  Box,
  Container,
} from '@chakra-ui/react';
import CardMember from '../components/CardMember';

const MemberCard = () => {
  return (
    <Box minH="100vh" bg="gray.50" py={8}>
      <Container maxW="md">
        <CardMember />
      </Container>
    </Box>
  );
};

export default MemberCard;