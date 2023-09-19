import { Card, CardContent, Grid, Skeleton, Typography } from '@mui/material'
import React from 'react'

const QuestionsSkeleton = () => {
  return (
    <>
      <Grid item xs={12}>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom><Skeleton width={300} animation="wave" /></Typography>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom><Skeleton width={300} animation="wave" /></Typography>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom><Skeleton width={300} animation="wave" /></Typography>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom><Skeleton width={300} animation="wave" /></Typography>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default QuestionsSkeleton