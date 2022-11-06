import { Box, Typography } from '@mui/material'
import React from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import Carousel from 'react-material-ui-carousel'
import { items } from '../helper/data'


const CarouselCom = () => {
  return (
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
  )
}

export default CarouselCom
