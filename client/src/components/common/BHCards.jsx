import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';

const BHCards = () => {
	return (
		<>
			<Card sx={{ boxShadow: 'none' }}>
				<CardMedia
					component='img'
					height='270'
					width='250'
					image='https://res.cloudinary.com/doqiij3sj/image/upload/v1609827076/sample.jpg'
					alt='Paella dish'
					sx={{ borderRadius: '7%' }}
				/>
				<CardContent>
					<Typography variant='subtitle1' component='h5'>
						Largo's Residence
					</Typography>
					<Typography variant='body2' color='text.secondary' component='p'>
						Balilihan, Bohol, Philippines
					</Typography>
					<Box sx={{ mt: 3 }}>
						<Typography variant='body1' component='span'>
							₱500 - ₱2000
						</Typography>
					</Box>
				</CardContent>
				<CardActions>
					<Button color='primary' variant='contained'>
						View Boarding House
					</Button>
				</CardActions>
			</Card>
		</>
	);
};

export default BHCards;
