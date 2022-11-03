import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { CardMedia, Box, Paper, Button, Typography, IconButton, TextareaAutosize } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { blue } from '@mui/material/colors';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';



const Profile = () => {
  const { currentUser, updateProfile } = useContext(AuthContext);

  const [camera, setCamera] = useState(false)
  const [profilePic, setProfilePic] = useState("");
  const [userName, setUserName] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.biography);
  const [userToggle, setUserToggle] = useState(false);
  const [bioToggle, setBioToggle] = useState(false);

  const handleUserClick = (data) => {
    updateProfile(data)
    setUserToggle(false);
  }

  const handleBioClick = (data) => {
    updateProfile(data)
    setBioToggle(false);
  }

  return (
    <Box style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", margin: "1rem" }}>
      <Box>
        <CardMedia
          component="img"
          image={currentUser.profile_pic}
          alt={currentUser.username}
          sx={{ width: 300, height: 300, overflow: "hidden" }} style={{ objectFit: "cover" }}
        />
      </Box>

      <IconButton color="primary" aria-label="upload picture" component="label">
        {camera &&
          <>
            <input value={profilePic} onChange={(e) => setProfilePic(e.target.value)} type="url" placeholder='Photo URL..' />
            <Button onClick={() => updateProfile({ profile_pic: profilePic })}>Update</Button>

          </>
        }
        <PhotoCamera onClick={() => setCamera(!camera)} />
      </IconButton>
      <Box>
        <Box sx={{ width: "300px", marginBottom: 3 }}>
          {userToggle ? (<Box>
            <input value={userName} onChange={(e) => setUserName(e.target.value)} />
            <Button onClick={() => handleUserClick({ username: userName })}>Update</Button>
          </Box>) : (<Typography variant="h5" sx={{ my: 2 }}>
            <AutoFixHighIcon color="primary" sx={{ cursor: "pointer", marginRight: 2 }} onClick={() => setUserToggle(true)} />
            Username : <span style={{ color: blue[800], fontWeight: 500 }}>{currentUser.username}</span>
          </Typography>)}
        </Box>

        <Box sx={{ width: "300px", marginBottom: 3 }}>
          {bioToggle ? (<Box>
            <TextareaAutosize minRows={3} maxRows={10} value={bio} onChange={(e) => setBio(e.target.value)} />
            <Button onClick={() => handleBioClick({ biography: bio })}>Update</Button>
          </Box>) : (<Typography variant="h5" sx={{ my: 2 }}>
            <AutoFixHighIcon color="primary" sx={{ cursor: "pointer", marginRight: 2 }} onClick={() => setBioToggle(true)} />
            Biography : <span style={{ color: blue[800], fontWeight: 500 }}>{currentUser.biography}</span>
          </Typography>)}
        </Box>
      </Box>
    </Box>
  )
}

export default Profile
