import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { BlogContext } from '../context/BlogContext'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
} from '@mui/material'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { useNavigate } from 'react-router-dom'
import { toastErrorNotify } from '../helper/ToastNotify'
import Carousel from 'react-material-ui-carousel'
import { items } from '../helper/data'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import Cards from '../components/Cards'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('View All')
  const [filtered, setFiltered] = useState([])

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const { getBlogs, blogs, getCategory, categories, page, setPage, loading } =
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
  const handleChange = event => {
    setSelectedCategory(event.target.value)
  }

  const filterBlogs = () => {
    if (selectedCategory === 'View All' && blogs.length !== 0) {
      setFiltered(blogs)
    } else {
      const filtered = blogs.filter(b => b.category === selectedCategory)
      console.log(filtered)
      setFiltered(filtered)
    }
  }
  console.log(filtered)
  return (
    <Box>
      <Carousel
        sx={{ position: 'relative' }}
        fullHeightHover={true} // We want the nav buttons wrapper to only be as big as the button element is
        navButtonsProps={{
          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
          style: {
            backgroundColor: 'white',
          },
        }}
        navButtonsWrapperProps={{
          // Move the buttons to the bottom. Unsetting top here to override default style.
          style: {
            bottom: '0',
            top: 'unset',
          },
        }}
        NextIcon={<GrFormNext size="40" />} // Change the "inside" of the next button to "next"
        PrevIcon={<GrFormPrevious color="white" size="40" />}
        indicatorIconButtonProps={{
          style: {
            color: 'rgba(255, 255, 255, 0.6)',
            width: 22,
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: 'rgba(255, 255, 255, 1)',
          },
        }}
        indicatorContainerProps={{
          style: {
            position: 'absolute',
            left: 0,
            top: '530px',
            zIndex: '2',
          },
        }}
        animation="slide"
      >
        {items.map(item => (
          <Box>
            <img
              src={item.image}
              height="600"
              width="100%"
              alt={item.title}
              style={{ objectFit: 'cover' }}
              loading="lazy"
            />
            <Box
              sx={{
                width: {
                  xs: '95%',
                  sm: '80%',
                  xl: '75%',
                },

                zIndex: 2,
                position: 'absolute',
                top: { xs: 170, sm: 278 },
                left: '50%',
                transform: 'translate(-50%, 0%)',
              }}
            >
              <Box
                sx={{
                  mx: 2,
                  color: 'white',
                  display: 'inline',
                  zIndex: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.149)',
                  padding: '5px 10px',
                  borderRadius: '8px',
                  fontFamily: 'Lora',
                  fontSize: { xs: '10px' },
                }}
              >
                {item.category.toUpperCase()}
              </Box>
              <Typography
                sx={{
                  top: { xs: 200, md: 315 },
                  left: { xs: 20, md: 70 },
                  color: 'white',
                  fontFamily: 'Lora',
                  fontSize: { xs: '24px' },
                  lineHeight: { xs: '32px' },
                  letterSpacing: 0,
                  textAlign: 'left',
                  fontWeight: '700',
                  maxWidth: 600,
                }}
              >
                {item.name}
              </Typography>
              <Box
                sx={{
                  top: { xs: 350, md: 422 },
                  left: { xs: 20, md: 70 },
                  color: '#E5E5E5',
                  fontFamily: 'Lora',
                  fontSize: { xs: '16px' },
                  lineHeight: { xs: '24px' },
                  letterSpacing: 0,
                  textAlign: 'left',
                  fontWeight: '400',
                  fontStyle: 'normal',
                 
                  display: { xs: 'block', sm: 'flex' },
                }}
              >
                <Typography sx={{ minWidth: 100 ,fontFamily: 'Lora',}}>{item.date}</Typography>
                <Box
                  sx={{
                    position: 'relative',
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      width: '30px',
                      height: '0px',
                      border: '1px solid #E5E5E5',
                    }}
                  />
                </Box>
                <Typography sx={{ ml: { xs: 0, sm: 6 }, maxWidth: 500 ,fontFamily: 'Lora',}}>
                  {item.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Carousel>
      <Box
        sx={{
          m: { xs: '50px auto', md: '100px auto' },
          width: {
            xs: '95%',
            sm: '80%',
            xl: '75%',
          },
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '28px', sm: '36px' },
            lineHeight: { xs: '36px', sm: '46px' },
            fontFamily: 'Lora',
            color: '#495057',
          }}
        >
          Popular topics
        </Typography>
        <Stack
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'row',
            mt: '30px',
            justifyContent: 'space-between',
          }}
        >
          <Stack sx={{ flexDirection: 'row', gap: '20px', fontFamily: 'Lora' }}>
            {categories.map(c => {
              return (
                <Typography
                  sx={{
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '25px',
                    color: selectedCategory === c.name ? '#D4A373' : '#495057',
                    fontFamily: 'Lora',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedCategory(c.name)}
                >
                  {c.name}
                </Typography>
              )
            })}
          </Stack>
          <Stack>
            <Typography
              sx={{
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '25px',
                color: selectedCategory === 'View All' ? '#D4A373' : '#495057',
                fontFamily: 'Lora',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedCategory('View All')}
            >
              View All
            </Typography>
          </Stack>
        </Stack>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Stack
            sx={{
              flexDirection: 'row',
              mt: '30px',
              justifyContent: 'space-between',
            }}
          >
            <Stack>
              <FormControl size="small" sx={{ m: 1, minWidth: 160 }}>
                <InputLabel id="filter-category">Filter Category</InputLabel>
                <Select
                  labelId="filter-category"
                  id="simple-select"
                  label="Filter Category"
                  onChange={handleChange}
                  defaultValue="View All"
                >
                  {categories.map(c => (
                    <MenuItem
                      sx={{ color: selectedCategory === c.name && '#D4A373' }}
                      value={c.name}
                    >
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack>
              <Typography
                sx={{
                  fontStyle: 'normal',
                  fontWeight: 700,
                  fontSize: '16px',
                  lineHeight: '25px',
                  color:
                    selectedCategory === 'View All' ? '#D4A373' : '#495057',
                  fontFamily: 'Lora',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedCategory('View All')}
              >
                View All
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Grid container spacing={2.5} sx={{ mt: 1 }}>
          {loading ? (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          ) : (
            filtered?.map(blog => (
              <Cards  blog={blog} openDetails={openDetails} currentUser={currentUser}/>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  )
}

export default Home
