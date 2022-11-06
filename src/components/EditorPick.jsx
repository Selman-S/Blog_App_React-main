import { Box, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { picks } from '../helper/data'


const EditorPick = () => {
  return (
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
          Editor’s Pick
        </Typography>
        <Grid container spacing={2.5} sx={{ mt: { xs: 2, md: 5 } }}>
          {picks.map(p => (
            <Grid item xs={12} md={6} lg={6} xl={4}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="350"
                  image={p.image}
                  alt={p.title}
                  sx={{ borderRadius: 2 }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: 350,
                    backgroundColor: 'rgb(0,0,0, .2)',
                  }}
                />
                <Box
                  sx={{
                    mx: 2,
                    position: 'absolute',
                    color: 'white',
                    display: 'inline',
                    zIndex: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.149)',
                    top: 15,
                    right: 10,
                    padding: '5px 10px',
                    borderRadius: '8px',
                    fontFamily: 'Lora',
                    fontSize: { xs: '10px' },
                  }}
                >
                  {p.category.toUpperCase()}
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 140,
                    left: 40,
                  }}
                >
                  <Typography
                    sx={{
                      top: 0,
                      left: 0,
                      minWidth: 100,
                      fontFamily: 'Lora',
                      textAlign: 'left',
                      color: 'white',
                      fontSize: '12px',
                    }}
                  >
                    {p.date}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'white',
                      fontFamily: 'Lora',
                      fontSize: '18px',
                      lineHeight: '25px',
                      letterSpacing: 0,
                      textAlign: 'left',
                      fontWeight: '700',
                      width: 270,
                    }}
                  >
                    {p.title}
                  </Typography>
                  <Typography
                    sx={{
                      width: 330,
                      mt: '13px',
                      fontFamily: 'Lora',
                      fontSize: '12px',
                      lineHeight: '20px',
                      color: '#E5E5E5',
                    }}
                  >
                    {p.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
  )
}

export default EditorPick