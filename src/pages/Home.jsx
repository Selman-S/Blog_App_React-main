import React, { useContext, useEffect } from 'react'
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
import { Badge, Box, Button, Grid } from '@mui/material'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { useNavigate } from 'react-router-dom'
import { toastErrorNotify } from '../helper/ToastNotify'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { BsAppIndicator } from 'react-icons/bs'
import { grey } from '@mui/material/colors'
import { ThemeContext } from '../context/ThemeContext'

const Home = () => {
  const { theme } = useContext(ThemeContext)
  const { currentUser } = useContext(AuthContext)

  const { getBlogs, blogs, getCategory, categories, page, setPage } =
    useContext(BlogContext)

  useEffect(() => {
    getBlogs()
    getCategory()
  }, [page])
  console.log(theme.palette.primary.dark)
  const navigate = useNavigate()
  const openDetails = slug => {
    if (!currentUser) {
      toastErrorNotify('Login for details of blog!')
    } else {
      navigate(`/details/${slug}`, { state: { slug } })
    }
  }
  var items = [
    {
      name: 'The five independent cottage rentals voted best in the UK by holidaymakers',
      description:
        "All of the firms at the top have fewer than 1,500 properties, while some of the country's biggest cottage rental companies failed to even make the top 10 in a survey, Wales Online reports. The Landmark Trust - a charity that restores old, historical buildings and transforms them into holiday rentals - came out on top.",
      image: 'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg',
      date: '27 Aug 2022',
      category: 'holiday',
    },
    {
      name: 'Peatland ‘core domain sets’ to streamline measurement and reporting',
      description:
        'The world’s peatlands are vital for combating climate change, thanks to their vast carbon stores. But researchers and policymakers can’t make the most of their value if that isn’t measured, monitored and reported consistently.',
      image:
        'https://images.unsplash.com/photo-1618089086953-c1b3b2b6f19c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      date: '12 Oct 2022',
      category: 'Forest',
    },
    {
      name: 'Great Blakenham landfill site end date set to pave way for Valley Ridge',
      description:
        'Masons Landfill is a 70-hectare former quarry where waste operations have been ongoing since the 1990s. It accepts non-hazardous business and household waste, as well as hazardous waste such as asbestos - one of two sites in the county that does.',
      image:
        'https://images.pexels.com/photos/221455/pexels-photo-221455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      date: '08.01.2022',
      category: 'Advanture',
    },
  ]
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
            left:0,
            // left: '-35%',
            // top: {xs:'550px'},
            top:'520px',
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
                mx: 2,
                color: 'white',
                top: { xs: 170 },
                left: { xs: 10 },
                position: 'absolute',
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
                position: 'absolute',
                top: { xs: 200 },
                left: { xs: 20 },
                color: 'white',
                fontFamily: 'Lora',
                fontSize: { xs: '24px' },
                lineHeight: { xs: '32px' },
                letterSpacing: 0,
                textAlign: 'left',
                fontWeight: '700',
                maxWidth:600 
              }}
            >
              {item.name}
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                top: { xs: 300 },
                left: { xs: 20 },
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
              <Box sx={{ position: 'relative',display:{xs:'none',sm:'block'} }}>
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
              <Typography sx={{ ml:{xs:0,sm:6},maxWidth:500 }}>{item.description}</Typography>
            </Box>
          </Box>
        ))}
      </Carousel>
      <Box style={{ margin: '2px auto' }}>
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
            {blogs.map(blog => (
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
            ))}
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
