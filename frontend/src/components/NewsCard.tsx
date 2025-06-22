import { Box, Image, Text } from "@chakra-ui/react"
import type { News } from "../services/newsService"

interface NewsCardProps {
  news: News;
}

const NewsCard = ({ news }: NewsCardProps) => {
    return (
    <Box
        marginY="50px"
        padding="20px"
        width="400px"
        height="full"
        border="2px solid"
        borderColor="primary"
        borderRadius="10px"
        justifySelf="center"
    >
        <Text fontSize="large" fontWeight="bold" color="primary">{news.title}</Text>
        <Image 
          src={news.image} 
          alt={news.title} 
          justifySelf="center" 
          marginY="20px" 
        />
        <Text fontSize="small" color="primary">{news.description}</Text>
        <Text fontSize="small" color="primary">{news.date}</Text>
    </Box>
  )
}

export default NewsCard