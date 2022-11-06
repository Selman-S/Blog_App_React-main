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
                width: {xs:'90%',sm:'590px', md: '800px', lg: '1100px', xl: '1400px' },
          
                zIndex: 2,
                position: 'absolute',
                top: { xs: 170, sm: 278 },
                left: '50%',
                transform: 'translate(-50%, 0%)',
              }}
            >
              {/* top: { xs: 170, md: 278 },
                  left: { xs: 10, md: 'auto' }, */}
              <Box
                sx={{
                  mx: 2,
                  color: 'white',
                  display: 'inline',

                  zIndex: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.149)',
                  padding: '5px 10px',
                  borderRadius: '8px',
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
                <Typography sx={{ minWidth: 100 }}>{item.date}</Typography>
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
                <Typography sx={{ ml: { xs: 0, sm: 6 }, maxWidth: 500 }}>
                  {item.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Carousel>
      <Box sx={{ m: {xs:'50px auto',md:'100px auto' },width: {xs:'95%',sm:'590px', md: '800px', lg: '1100px', xl: '1400px' },border:'1px solid red' }}>
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
        <Box spacing={2}>
          <Box
            xs={12}
            md={6}
            lg={4}
            xl={3}
            sx={{
              my: 3,
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              flexWrap: 'wrap',
              mx: 'auto',
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            ) : (
              filtered?.map(blog => (
                <Card sx={{ width: 345, height: 457, position: 'relative' }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="Emre Sharp"
                        aria-label="blog"
                        sx={{ bgcolor: red[500] }}
                      />
                    }
                    title={blog.author}
                    subheader={blog.last_updated_date.slice(0, 10)}
                  />
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => openDetails(blog.slug)}
                  >
                    <CardMedia
                      component="img"
                      height="194"
                      image={blog.image}
                      alt={blog.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {blog.title}
                      </Typography>
                      <Typography
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: '3',
                          WebkitBoxOrient: 'vertical',
                        }}
                        variant="body2"
                        color="text.secondary"
                      >
                        {blog.content}
                      </Typography>
                    </CardContent>
                  </div>
                  <CardActions
                    disableSpacing
                    sx={{
                      width: '90%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      position: 'absolute',
                      bottom: '5px',
                      left: '5px',
                    }}
                  >
                    <div>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon
                          sx={{
                            color:
                              blog.like_post?.filter(
                                like => like.user_id === currentUser.id
                              )[0]?.user_id && 'red',
                          }}
                        />
                        <Typography sx={{ marginLeft: 1 }}>
                          {blog.like_count}
                        </Typography>
                      </IconButton>
                      <IconButton aria-label="comment">
                        <ChatOutlinedIcon />
                        <Typography sx={{ marginLeft: 1 }}>
                          {blog.comment_count}
                        </Typography>
                      </IconButton>
                      <IconButton aria-label="view">
                        <RemoveRedEyeOutlinedIcon />
                        <Typography sx={{ marginLeft: 1 }}>
                          {blog.post_view_count}
                        </Typography>
                      </IconButton>
                    </div>
                    <div>
                      <Badge
                        badgeContent={blog.category}
                        color="primary"
                        sx={{ mx: 2 }}
                      />
                    </div>
                  </CardActions>
                </Card>
              ))
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => setPage(page + 6)}
          >
            View More...
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
