import { Container, Grid } from '@mui/material';
import React,{ Fragment }  from 'react';
import BHCards from '../../components/common/BHCards';
import { Popover, Transition } from '@headlessui/react'
import {
	ArrowPathIcon,
	Bars3Icon,
	BookmarkSquareIcon,
	CalendarIcon,
	ChartBarIcon,
	CursorArrowRaysIcon,
	LifebuoyIcon,
	PhoneIcon,
	PlayIcon,
	ShieldCheckIcon,
	Squares2X2Icon,
	XMarkIcon,
  } from '@heroicons/react/24/outline'
  import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Home = () => {
	return (
		<div>
			<div className='container mx-auto'> 
				<Grid container direction='row' spacing={3} sx={{ mt: 1 }}>
					<Grid item xl={2}>
						<BHCards />
					</Grid>
					<Grid item xl={2}>
						<BHCards />
					</Grid>
					<Grid item xl={2}>
						<BHCards />
					</Grid>
					<Grid item xl={2}>
						<BHCards />
					</Grid>
					<Grid item xl={2}>
						<BHCards />
					</Grid>
					<Grid item xl={2}>
						<BHCards />
					</Grid>
					<Grid item xl={2}>
						<BHCards />
					</Grid>
					<Grid item xl={2}>
						<BHCards />
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default Home;
