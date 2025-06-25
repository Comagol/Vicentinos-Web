import { useEffect, useState } from "react"
import { Box, Grid, Text, Spinner, Center, Alert, AlertIcon } from "@chakra-ui/react"
import NewsCard from "../components/NewsCard"
import { newsService, type NewsItem } from "../services/newsService"

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)
        const newsData = await newsService.getAllNews()
        setNews(newsData)
      } catch (err) {
        console.error('Error fetching news:', err)
        setError('Error al cargar las noticias. Inténtalo de nuevo más tarde.')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <Center py={10}>
        <Spinner size="xl" color="primary" />
      </Center>
    )
  }

  if (error) {
    return (
      <Center py={10}>
        <Alert status="error" maxW="md">
          <AlertIcon />
          {error}
        </Alert>
      </Center>
    )
  }

  if (news.length === 0) {
    return (
      <Center py={10}>
        <Text fontSize="lg" color="gray.600">
          No hay noticias disponibles
        </Text>
      </Center>
    )
  }

  return (
    <Box p={8}>
      <Text 
        fontSize="3xl" 
        fontWeight="bold" 
        color="primary" 
        textAlign="center" 
        mb={8}
      >
        Noticias
      </Text>
      
      <Grid 
        templateColumns={{ 
          base: "1fr", 
          md: "repeat(2, 1fr)", 
          lg: "repeat(3, 1fr)" 
        }}
        gap={6}
        justifyItems="center"
      >
        {news.map((newsItem) => (
          <NewsCard key={newsItem.id} news={newsItem} />
        ))}
      </Grid>
    </Box>
  )
}

export default News