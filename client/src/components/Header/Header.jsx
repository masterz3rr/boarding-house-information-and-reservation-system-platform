import {
	AppBar,
	Avatar,
	Box,
	Container,
	Divider,
	Menu,
	MenuItem,
	Paper,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import Logo from '../Logo/Logo';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useState } from 'react';
import DialogContainer from '../common/DialogContainer';
import Register from '../AuthForm/Register/Register';
import Login from '../AuthForm/Login/Login';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';

const userLoggedIn = [
	{
		id: 'profile',
		url: '/profile',
		label: 'Profile Settings',
	},
];

const userNotLoggedIn = [
	{
		id: 'register',
		label: 'Register',
	},
	{
		id: 'login',
		label: 'Login',
	},
];

const Header = () => {
	// const openModalRef = useRef(null);
	const authContext = useContext(AuthContext);
	const fetchContext = useContext(FetchContext);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [selectedMenu, setSelectedMenu] = useState('');
	const [openPopup, setOpenPopup] = useState(false);
	const history = useNavigate();

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const handleModalClose = () => {
		setOpenPopup(!openPopup);
	};

	const handleLogOut = async () => {
		try {
			await fetchContext.authAxios.get('/auth/logout');
			authContext.logout();
			history('/');
		} catch (error) {
			console.log(error?.response?.message);
		}
	};

	return (
		<>
			<AppBar position='sticky' color='' sx={{ py: 1 }}>
				<Container maxWidth={false}>
					<Toolbar>
						<Box sx={{ flexGrow: 1 }}>
							<Logo />
						</Box>

						<Box
							sx={{
								flexGrow: 0,
								display: 'flex',
								alignItems: 'center',
								gap: 2,
							}}
						>
							{Object.keys(authContext.authState.userInfo).length > 0 && (
								<Box
									sx={{
										flexGrow: 0,
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-end',
									}}
								>
									<Typography
										variant='subtitle1'
										component='h6'
										sx={{ textTransform: 'capitalize' }}
									>{`${authContext.authState.userInfo.firstName} ${authContext.authState.userInfo.lastName}`}</Typography>
									<Typography
										variant='body2'
										component='span'
									>{`${authContext.authState.userInfo.role}`}</Typography>
								</Box>
							)}

							<Tooltip title='Open settings'>
								<Paper
									variant='outlined'
									sx={{
										display: 'flex',
										alignItems: 'center',
										py: 1,
										px: 1,
										gap: 1.5,
										borderRadius: 28,
										cursor: 'pointer',
									}}
									onClick={handleOpenUserMenu}
								>
									<MenuIcon fontSize='small' />
									{Object.keys(authContext.authState.userInfo).length > 0 ? (
										<Avatar
											alt={
												authContext.authState.userInfo
													? `${authContext.authState.userInfo.firstName} ${authContext.authState.userInfo.lastName}`
													: ''
											}
											sx={{ width: 28, height: 28 }}
											src={
												authContext.authState.userInfo
													? `${authContext.authState.userInfo.image}`
													: ''
											}
										/>
									) : (
										<Avatar>
											<AccountCircleIcon />
										</Avatar>
									)}
								</Paper>
							</Tooltip>
							<Menu
								sx={{ mt: '55px' }}
								id='menu-appbar'
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
								{Object.keys(authContext.authState.userInfo).length === 0 &&
									userNotLoggedIn.map((menuItem, index) => (
										<MenuItem
											key={index}
											onClick={() => {
												setAnchorElUser(null);
												setOpenPopup(true);
												setSelectedMenu(menuItem.label);
											}}
											sx={{ width: 190 }}
										>
											<Typography textAlign='center'>
												{menuItem.label}
											</Typography>
										</MenuItem>
									))}
								{/* {settings.map((setting) => (
									<MenuItem key={setting} onClick={handleCloseUserMenu}>
										<Typography textAlign='center'>{setting}</Typography>
									</MenuItem>
								))} */}
								{Object.keys(authContext.authState.userInfo).length > 0 &&
									userLoggedIn.map((menuItem, index) => (
										<MenuItem key={index} sx={{ width: 190 }}>
											<Typography textAlign='center'>
												{menuItem.label}
											</Typography>
										</MenuItem>
									))}
								{Object.keys(authContext.authState.userInfo).length > 0 && (
									<Divider />
								)}

								{Object.keys(authContext.authState.userInfo).length > 0 && (
									<MenuItem onClick={handleLogOut}>Log out</MenuItem>
								)}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<DialogContainer
				title={selectedMenu}
				open={openPopup}
				onClose={handleModalClose}
			>
				{selectedMenu === 'Register' ? (
					<Register onClose={handleModalClose} />
				) : selectedMenu === 'Login' ? (
					<Login onClose={handleModalClose} />
				) : null}
			</DialogContainer>
		</>
	);
};

export default Header;
