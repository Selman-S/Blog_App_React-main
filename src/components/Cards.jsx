import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Grid } from '@mui/material';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'

const Cards = ({blog,openDetails,currentUser}) => {
  return (
    <Grid item xs={12} sm={6} lg={4} xl={3}>
                <Box sx={{ width: '100%', height: 457, position: 'relative' }}>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => openDetails(blog.slug)}
                  >
                    <CardMedia
                      component="img"
                      height="280"
                      image={blog.image}
                      alt={blog.title}
                      sx={{ borderRadius: 2 }}
                    />

                    <CardContent sx={{ p: 0 }}>
                      <Typography
                        gutterBottom
                        sx={{
                          fontFamily: 'Lora',
                          fontSize: '12px',
                          lineHeight: '16px',
                          color: '#6C757D',
                          my: 1.5,
                        }}
                      >
                        {blog.published_date.slice(8, 10)}.
                        {blog.published_date.slice(5, 7)}.
                        {blog.published_date.slice(0, 4)}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '22px',
                          lineHeight: '25px',
                          color: '#495057',
                          fontFamily: 'Lora',
                        }}
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {blog.title}
                      </Typography>
                      <Typography
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: '3',
                          WebkitBoxOrient: 'vertical',
                          fontFamily: 'Lora',
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '24px',
                          color: '#6C757D',
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
                  >
                    <div>
                      <IconButton 
                      sx={{
                        position: 'absolute',
                        top:280,
                        right:10,
                    }}
                      aria-label="add to favorites">
                        <FavoriteIcon
                          sx={{
                           
                            color:
                              blog.like_post?.filter(
                                like => like.user_id === currentUser.id
                              )[0]?.user_id &&'red',
                          }}
                        />
                        <Typography sx={{ml:.5,fontWeight:700, fontFamily:'Lora',}}>
                          {blog.like_count}
                        </Typography>
                      </IconButton>
                      <IconButton
                       sx={{
                        position: 'absolute',
                        top:280,
                        right:60,
                    }}
                      aria-label="comment">
                        <ChatOutlinedIcon />
                        <Typography  sx={{ml:.5,fontWeight:700, fontFamily:'Lora',}}>
                          {blog.comment_count}
                        </Typography>
                      </IconButton>
                      <IconButton 
                        sx={{
                          position: 'absolute',
                          top:280,
                        right:110,
                    
                      }}
                      aria-label="view">
                        <RemoveRedEyeOutlinedIcon />
                        <Typography sx={{ml:.5,fontWeight:700 , fontFamily:'Lora',}}>
                          {blog.post_view_count}
                        </Typography>
                      </IconButton>
                    </div>
                    <div>
                    <Box
                sx={{
                  position:'absolute',
                  top:10,
                  right:10,
                  color: 'white',
                  display: 'inline',
                  zIndex: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '5px 10px',
                  borderRadius: '12px',
                  fontFamily: 'Lora',
                  fontSize: { xs: '10px' },
                }}
              >
                {blog.category.toUpperCase()}
              </Box>
                     
                    </div>
                  </CardActions>
                </Box>
              </Grid>
  )
}

export default Cards;