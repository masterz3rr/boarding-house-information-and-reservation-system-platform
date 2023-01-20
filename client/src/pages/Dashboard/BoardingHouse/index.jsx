import { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from '../../../context/AuthContext';
import { FetchContext } from '../../../context/FetchContext';
import DialogContainer from '../../../components/common/DialogContainer';
import BHForm from '../../../components/BHForm';

const BoardingHouse = () => {
	const authContext = useContext(AuthContext);
	const fetchContext = useContext(FetchContext);
	const [boardingHouse, setBoardingHouse] = useState({} || null);
	const [selectedMenu, setSelectedMenu] = useState('');
	const [openPopup, setOpenPopup] = useState(false);

	const handleModalClose = () => {
		setOpenPopup(!openPopup);
	};

	const getUserHouse = async () => {
		fetchContext.authAxios
			.get(`/boardinghouse`)
			.then(({ data }) => {
				console.log(data.boardingHouse);
				setBoardingHouse(data.boardingHouse);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getUserHouse();
		//   first
		//   return () => {
		// 	second
		//   }
	}, []);

	return (
		<>
			<Grid container justifyContent='flex-end' alignItems='center' spacing={2}>
				<Grid item>
					{boardingHouse === null ||
					Object.keys(authContext.authState.userInfo).length === 0 ? (
						<Button
							variant='contained'
							startIcon={<AddCircleOutlineIcon />}
							onClick={() => {
								setOpenPopup(true);
								setSelectedMenu('Create Boarding House');
							}}
						>
							Create Boarding House
						</Button>
					) : (
						<Grid container spacing={2}>
							<Grid item>
								<Button
									variant='contained'
									startIcon={<AddCircleOutlineIcon />}
									onClick={() => {
										setSelectedMenu('Add Rooms to the house');
									}}
								>
									Add Rooms
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant='contained'
									startIcon={<EditIcon />}
									onClick={() => {
										setSelectedMenu('Create Boarding House');
									}}
								>
									Update Boarding House
								</Button>
							</Grid>
						</Grid>
					)}
				</Grid>
			</Grid>
			{boardingHouse !== null ||
			Object.keys(authContext.authState.userInfo).length !== 0 ? (
				<Grid container spacing={2} sx={{ mt: 2 }}>
					<Grid item xs={12} lg={3}>
						<Paper variant='outlined' sx={{ py: 4, px: 2 }}>
							<img
								src={boardingHouse?.image}
								alt={boardingHouse?.houseName}
								width='100%'
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} lg={9}>
						<Paper variant='outlined' sx={{ py: 4, px: 2 }}>
							<Typography
								variant='h3'
								component='p'
								sx={{ fontWeight: 'bold' }}
							>
								{boardingHouse?.houseName}
							</Typography>
							<Typography component='p' sx={{ mt: 3 }}>
								{boardingHouse?.description}
							</Typography>
						</Paper>
					</Grid>
				</Grid>
			) : null}

			<DialogContainer
				title={selectedMenu}
				open={openPopup}
				onClose={handleModalClose}
			>
				<BHForm />
			</DialogContainer>
		</>
	);
};

export default BoardingHouse;
