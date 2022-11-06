import React, { useContext } from 'react'
import { AppBar, Divider } from '@mui/material'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { BiUserCircle } from 'react-icons/bi'
import { BsGithub } from 'react-icons/bs'
import { BsLinkedin } from 'react-icons/bs'
import { BsTwitter } from 'react-icons/bs'

const NavBar = () => {
  const navigate = useNavigate()
  const { currentUser, logOut } = useContext(AuthContext)
  const settings = currentUser
    ? ['Profile', 'MyPosts', 'NewBlog', 'Logout']
    : ['About', 'Login', 'Register']
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = e => {
    setAnchorElNav(null)
    if (e.target.innerText.toLocaleLowerCase() === 'new blog') {
      navigate('/newblog')
    } else if (e.target.innerText.toLocaleLowerCase() === 'about') {
      navigate('/about')
    } else if (e.target.innerText.toLocaleLowerCase() === 'home') {
      navigate('/')
    } else if (e.target.innerText.toLocaleLowerCase() === 'contact us') {
      navigate('/contact')
    }
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="absolute" color="transparent">
      <Box
        sx={{
          opacity: 0.2,
          position: 'absolute',
          width: '100%',
          backgroundColor: 'black',
          top: 0,
          left: 0,
          height: { xs: '56px', sm: '65px', md: '70px' },
        }}
      >
        {' '}
      </Box>

      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Dancing Script',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            SELMAN
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: 'white' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">New Blog</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">About</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Dancing Script',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            SELMAN
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'end',
              fontFamily:'Lora'
            }}
          >
            <Button
              onClick={e => handleCloseNavMenu(e)}
              sx={{ my: 2, color: 'white', display: 'block' , fontFamily:'Lora'}}
            >
              Home
            </Button>
            <Button
              onClick={e => handleCloseNavMenu(e)}
              sx={{ my: 2, color: 'white', display: 'block', fontFamily:'Lora' }}
            >
              New Blog
            </Button>{' '}
            <Button
              onClick={e => handleCloseNavMenu(e)}
              sx={{ my: 2, color: 'white', display: 'block', fontFamily:'Lora' }}
            >
              About
            </Button>{' '}
            <Button
              onClick={e => handleCloseNavMenu(e)}
              sx={{ my: 2, color: 'white', display: 'block', fontFamily:'Lora' }}
            >
              Contact us
            </Button>
          </Box>
          <Box sx={{ display: {xs:'none',sm:'flex'}, gap: 2, mx: 2 }}>
            <Divider color="white" orientation="vertical" flexItem />
            <a
              href="https://github.com/Selman-S"
              target="_blank"
              rel="noreferrer"
            >
              <BsGithub
                style={{ cursor: 'pointer' }}
                color="white"
                fontSize="1.2rem"
              />
            </a>
            <a
              href="https://twitter.com/F1662_Gece"
              target="_blank"
              rel="noreferrer"
            >
              <BsTwitter
                style={{ cursor: 'pointer' }}
                color="white"
                fontSize="1.2rem"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/selman-sahbudak/"
              target="_blank"
              rel="noreferrer"
            >
              <BsLinkedin
                style={{ cursor: 'pointer' }}
                color="white"
                fontSize="1.2rem"
              />
            </a>
            <Divider color="white" orientation="vertical" flexItem />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip
              title={currentUser ? currentUser.username : 'Authorization'}
            >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {currentUser ? (
                  <Avatar alt="Emre Sharp" src={currentUser.profile_pic} />
                ) : (
                  <BiUserCircle size="40" color="white" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting === 'Logout' ? (
                    <Typography
                      onClick={() => logOut(navigate)}
                      textAlign="center"
                    >
                      {setting}
                    </Typography>
                  ) : (
                    <Typography
                      onClick={() =>
                        navigate(`/${setting.toLocaleLowerCase()}`)
                      }
                      textAlign="center"
                    >
                      {setting}
                    </Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
