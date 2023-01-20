import React, { forwardRef, useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import {
	Avatar,
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Menu,
	MenuItem,
	Paper,
	Tooltip,
	Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import {
	dashboardBHLinks,
	dashboardUserLinks,
	landlordLinks,
} from '../../../constants/menu-items-dashboard/dashboardLinks';
import routeConfig from '../../../config/routeConfig';
import { FetchContext } from '../../../context/FetchContext';

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const menu = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		url: '/dashboard',
		icon: <DashboardIcon />,
	},
];

const userLoggedIn = [
	{
		id: 'profile',
		url: '/profile',
		label: 'Profile Settings',
	},
];

const Sidebar = ({ index }) => {
	const location = useLocation();
	const [open, setOpen] = React.useState(false);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const authContext = useContext(AuthContext);
	const fetchContext = useContext(FetchContext);
	const history = useNavigate();

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
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
		<Drawer variant='permanent' open={open} key={index}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					paddingY: 2,
				}}
			>
				<img src='/favicon.ico' alt='logo' />
			</Box>
			<Divider />
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					paddingY: 2,
					position: 'relative',
				}}
			>
				<Avatar
					alt={
						authContext.authState.userInfo
							? `${authContext.authState.userInfo.firstName} ${authContext.authState.userInfo.lastName}`
							: ''
					}
					src={
						authContext.authState.userInfo
							? `${authContext.authState.userInfo.image}`
							: ''
					}
					sx={{
						width: open ? 65 : 36,
						height: open ? 65 : 36,
					}}
				/>
				<Tooltip title='Open Settings'>
					<Paper
						variant='outlined'
						sx={{
							display: 'flex',
							alignItems: 'center',
							p: 0.5,
							cursor: 'pointer',
							mt: open ? 0 : 1,
							position: open ? 'absolute' : 'static',
							right: 12,
							top: 10,
						}}
						onClick={handleOpenUserMenu}
					>
						<MenuIcon fontSize='small' sx={{ p: 0 }} />
					</Paper>
				</Tooltip>
				<Menu
					// sx={{ mt: '55px' }}
					id='menu-appbar'
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'center',
						horizontal: 'center',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'center',
						horizontal: 'center',
					}}
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
				>
					{Object.keys(authContext.authState.userInfo).length > 0 &&
						userLoggedIn.map((menuItem, index) => (
							<MenuItem key={index} sx={{ width: 190 }}>
								<Typography textAlign='center'>{menuItem.label}</Typography>
							</MenuItem>
						))}
					{Object.keys(authContext.authState.userInfo).length > 0 && (
						<Divider />
					)}
					{Object.keys(authContext.authState.userInfo).length > 0 && (
						<MenuItem onClick={handleLogOut}>
							<ListItemIcon>
								<LogoutIcon fontSize='small' />
							</ListItemIcon>
							Log out
						</MenuItem>
					)}
				</Menu>
				{open && (
					<Box sx={{ mt: 1.5 }}>
						<Typography
							variant='h6'
							component='span'
							sx={{ textTransform: 'capitalize', textAlign: 'center' }}
						>
							{authContext.authState.userInfo
								? `${authContext.authState.userInfo.firstName} ${authContext.authState.userInfo.lastName}`
								: ''}
						</Typography>
						<Typography
							variant='overline'
							component='span'
							sx={{ display: 'block', textAlign: 'center' }}
						>
							{authContext.authState.userInfo
								? `${authContext.authState.userInfo.role}`
								: ''}
						</Typography>
					</Box>
				)}
			</Box>
			<Divider />

			<Box>
				<List>
					{menu.map((item, index) => {
						const isCurrentRoute = location.pathname === `${item.url}`;
						let listItemProps = {
							component: forwardRef((props, ref) => (
								<Link
									ref={ref}
									{...props}
									to={`${routeConfig.basename}${item.url}`}
								/>
							)),
						};
						return (
							<ListItem
								key={index}
								disablePadding
								sx={{
									display: 'block',
									backgroundColor: isCurrentRoute ? '#009688' : 'transparent',
								}}
							>
								<ListItemButton
									{...listItemProps}
									key={item.id}
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										color: isCurrentRoute ? 'white' : 'inherit',
										px: 'auto',
									}}
								>
									<ListItemIcon
										key={item.url}
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
											color: isCurrentRoute ? 'white' : 'inherit',
										}}
									>
										{item.icon}
									</ListItemIcon>
									<ListItemText
										key={item.title}
										primary={item.title}
										sx={{ opacity: open ? 1 : 0 }}
									/>
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>

				<Divider />
				{authContext.isAdmin() && (
					<>
						<List
							subheader={
								open && (
									<ListSubheader component='div'>
										{dashboardUserLinks?.title}
									</ListSubheader>
								)
							}
						>
							{dashboardUserLinks?.children?.map((item, index) => {
								const isCurrentRoute = location.pathname === `${item.url}`;
								let listItemProps = {
									component: forwardRef((props, ref) => (
										<Link
											ref={ref}
											{...props}
											to={`${routeConfig.basename}${item.url}`}
										/>
									)),
								};
								return (
									<div key={index}>
										{item.allowedRoles.includes(
											authContext.authState.userInfo.role
										) && (
											<ListItem
												disablePadding
												sx={{
													display: 'block',
													backgroundColor: isCurrentRoute
														? '#009688'
														: 'transparent',
												}}
											>
												<ListItemButton
													{...listItemProps}
													sx={{
														minHeight: 48,
														justifyContent: open ? 'initial' : 'center',
														px: 'auto',
														color: isCurrentRoute ? 'white' : 'inherit',
													}}
												>
													<ListItemIcon
														sx={{
															minWidth: 0,
															mr: open ? 3 : 'auto',
															justifyContent: 'center',
															color: isCurrentRoute ? 'white' : 'inherit',
														}}
													>
														{item.icon}
													</ListItemIcon>
													<ListItemText
														primary={item.title}
														sx={{ opacity: open ? 1 : 0 }}
													/>
												</ListItemButton>
											</ListItem>
										)}
									</div>
								);
							})}
						</List>
						<Divider />
						<List
							subheader={
								open && (
									<ListSubheader component='div'>
										{dashboardBHLinks?.title}
									</ListSubheader>
								)
							}
						>
							{dashboardBHLinks?.children?.map((item, index) => {
								const isCurrentRoute = location.pathname === `${item.url}`;
								let listItemProps = {
									component: forwardRef((props, ref) => (
										<Link
											ref={ref}
											{...props}
											to={`${routeConfig.basename}${item.url}`}
										/>
									)),
								};
								return (
									<div key={index}>
										{item.allowedRoles.includes(
											authContext.authState.userInfo.role
										) && (
											<ListItem
												disablePadding
												sx={{
													display: 'block',
													backgroundColor: isCurrentRoute
														? '#009688'
														: 'transparent',
												}}
											>
												<ListItemButton
													{...listItemProps}
													sx={{
														minHeight: 48,
														justifyContent: open ? 'initial' : 'center',
														px: 'auto',
														color: isCurrentRoute ? 'white' : 'inherit',
													}}
												>
													<ListItemIcon
														sx={{
															minWidth: 0,
															mr: open ? 3 : 'auto',
															justifyContent: 'center',
															color: isCurrentRoute ? 'white' : 'inherit',
														}}
													>
														{item.icon}
													</ListItemIcon>
													<ListItemText
														primary={item.title}
														sx={{ opacity: open ? 1 : 0 }}
													/>
												</ListItemButton>
											</ListItem>
										)}
									</div>
								);
							})}
						</List>
					</>
				)}
				{authContext.isLandlord() && (
					<>
						<List>
							{landlordLinks?.children?.map((item, index) => {
								const isCurrentRoute = location.pathname === `${item.url}`;
								let listItemProps = {
									component: forwardRef((props, ref) => (
										<Link
											ref={ref}
											{...props}
											to={`${routeConfig.basename}${item.url}`}
										/>
									)),
								};
								return (
									<div key={index}>
										{item.allowedRoles.includes(
											authContext.authState.userInfo.role
										) && (
											<ListItem
												disablePadding
												sx={{
													display: 'block',
													backgroundColor: isCurrentRoute
														? '#009688'
														: 'transparent',
												}}
											>
												<ListItemButton
													{...listItemProps}
													sx={{
														minHeight: 48,
														justifyContent: open ? 'initial' : 'center',
														px: 'auto',
														color: isCurrentRoute ? 'white' : 'inherit',
													}}
												>
													<ListItemIcon
														sx={{
															minWidth: 0,
															mr: open ? 3 : 'auto',
															justifyContent: 'center',
															color: isCurrentRoute ? 'white' : 'inherit',
														}}
													>
														{item.icon}
													</ListItemIcon>
													<ListItemText
														primary={item.title}
														sx={{ opacity: open ? 1 : 0 }}
													/>
												</ListItemButton>
											</ListItem>
										)}
									</div>
								);
							})}
						</List>
						<Divider />
					</>
				)}
				<Box
					sx={{
						mt: 2,
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<IconButton onClick={() => setOpen(!open)}>
						{!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</Box>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
