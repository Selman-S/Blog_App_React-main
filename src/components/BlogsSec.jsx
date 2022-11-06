import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import Cards from './Cards'

const BlogsSec = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  handleFilterChange,
  loading,
  filtered,
  page,
  openDetails,
  currentUser,
  handlePaginationChange,
}) => {
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
                onChange={handleFilterChange}
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
      </Box>
      <Grid container spacing={2.5} sx={{ mt: 1 }}>
        {loading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          filtered?.map((blog, i) => {
            if (i < page * 8 && i >= (page - 1) * 8) {
              return (
                <>
                  <Cards
                    key={i}
                    blog={blog}
                    openDetails={openDetails}
                    currentUser={currentUser}
                  />
                </>
              )
            }
          })
        )}
      </Grid>
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(filtered.length / 8)}
          variant="outlined"
          page={page}
          onChange={handlePaginationChange}
        />
      </Stack>
    </Box>
  )
}

export default BlogsSec
