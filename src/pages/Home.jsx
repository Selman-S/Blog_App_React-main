import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { BlogContext } from '../context/BlogContext'
import { Box, CardMedia, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toastErrorNotify } from '../helper/ToastNotify'
import CarouselCom from '../components/Carousel'
import MiddleBlog from '../components/MiddleBlog'
import BlogsSec from '../components/BlogsSec'
import EditorPick from '../components/EditorPick'


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('View All')
  const [filtered, setFiltered] = useState([])
  const [page, setPage] = useState(1)

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const { getBlogs, blogs, getCategory, categories, loading } =
    useContext(BlogContext)

  useEffect(() => {
    getBlogs()
    getCategory()
  }, [])

  useEffect(() => {
    setFiltered(blogs)
    filterBlogs()
  }, [selectedCategory, blogs])

  const openDetails = slug => {
    if (!currentUser) {
      toastErrorNotify('Login for details of blog!')
    } else {
      navigate(`/details/${slug}`, { state: { slug } })
    }
  }
  const handleFilterChange = event => {
    setSelectedCategory(event.target.value)
    setPage(1)
  }
  const handlePaginationChange = (event, value) => {
    setPage(value)
  }

  const filterBlogs = () => {
    if (selectedCategory === 'View All' && blogs.length !== 0) {
      setFiltered(blogs)
      setPage(1)
    } else {
      const filtered = blogs.filter(b => b.category === selectedCategory)
      console.log(filtered)
      setFiltered(filtered)
      setPage(1)
    }
  }
  console.log(filtered)
  return (
    <Box>
      <CarouselCom />

      <BlogsSec
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleFilterChange={handleFilterChange}
        loading={loading}
        filtered={filtered}
        page={page}
        openDetails={openDetails}
        currentUser={currentUser}
        handlePaginationChange={handlePaginationChange}
      />

      <MiddleBlog />
      <EditorPick />
    </Box>
  )
}

export default Home
