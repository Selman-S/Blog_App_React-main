import { Box, Typography } from '@mui/material'
import React from 'react'
import { middleBlog } from '../helper/data'

const MiddleBlog = () => {
  
  const item = middleBlog[Math.floor(Math.random() * middleBlog.length)]

  return (
    <Box sx={{ position: 'relative' }}>
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
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 600,
            backgroundColor: 'rgb(0,0,0, .2)',

          }}
        />
        <Box
          sx={{
            width: {
              xs: '95%',
              sm: '80%',
              md: '530px',
            },
            textAlign: 'center',
            zIndex: 2,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
            
              color: 'white',
              fontFamily: 'Lora',
              fontSize: { xs: '24px' },
              lineHeight: { xs: '32px' },
              letterSpacing: 0,
              textAlign: 'center',
              fontWeight: '700',
              mt:'24px',
              maxWidth: 600,
            }}
          >
            {item.title}
          </Typography>
          <Box
            sx={{
              color: '#E5E5E5',
              fontFamily: 'Lora',
              fontSize: { xs: '16px' },
              lineHeight: { xs: '24px' },
              letterSpacing: 0,
              textAlign: 'center',
              fontWeight: '400',
              display: 'block',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'block' ,
              }}
            >
            </Box>
            <Typography
              sx={{ mt:'13px',  fontFamily: 'Lora' }}
            >
              {item.description}
            </Typography>
              <Box
                sx={{
                 m:'24px auto 15px',
                  width: '30px',
                  height: '0px',
                  border: '1px solid #E5E5E5',
                }}
              />
          </Box>
                <Typography sx={{ minWidth: 100, fontFamily: 'Lora',textAlign: 'center',color:'white'}}>
                  {item.blog_date}
                </Typography>
        </Box>
      </Box>
  )
}

export default MiddleBlog