import { Suspense, lazy, useContext } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import SuspenseLoader from '../../components/SuspenseLoader';

const Loader = (Component) => (props) =>
	(
		<Suspense fallback={<SuspenseLoader />}>
			<Component {...props} />
		</Suspense>
	);

const Dashboard = Loader(lazy(() => import('../../pages/Dashboard')));
const Home = Loader(lazy(() => import('../../pages/Home')));
const PendingHouse = Loader(
	lazy(() => import('../../pages/Dashboard/BoardingHouse/Pending'))
);
const ApprovedHouses = Loader(
	lazy(() => import('../../pages/Dashboard/BoardingHouse/Approved'))
);
const Tenant = Loader(lazy(() => import('../../pages/Dashboard/Users/Tenant')));
const LivingTenant = Loader(
	lazy(() => import('../../pages/Dashboard/Users/Tenant/Living'))
);
const Landlord = Loader(
	lazy(() => import('../../pages/Dashboard/Users/Landlord'))
);
const Users = Loader(lazy(() => import('../../pages/Dashboard/Users')));
const BoardingHouse = Loader(
	lazy(() => import('../../pages/Dashboard/BoardingHouse'))
);

const AdminRoute = ({ children, ...rest }) => {
	const authContext = useContext(AuthContext);

	if (!authContext.isAuthenticated() && !authContext.isAdmin()) {
		return <Navigate to='/' />;
	}
	return <Outlet />;
};

const LandlordRoute = ({ children, ...rest }) => {
	const authContext = useContext(AuthContext);

	if (!authContext.isAuthenticated() && !authContext.isLandLord()) {
		return <Navigate to='/' />;
	}
	return <Outlet />;
};

const DashboardRoutes = {
	path: '/',
	element: <DashboardLayout />,
	children: [
		{
			element: <AdminRoute />,
			children: [
				{
					path: '/dashboard',
					element: <Dashboard />,
				},
				{
					path: '/user/landlord',
					element: <Landlord />,
				},
				{
					path: '/user/tenant',
					element: <Tenant />,
				},
				{
					path: '/boardingHouse/pending',
					element: <PendingHouse />,
				},
				{
					path: '/boardingHouse/approved',
					element: <ApprovedHouses />,
				},
			],
		},
		{
			element: <LandlordRoute />,
			children: [
				{
					path: '/',
					element: <Home />,
				},
				{
					path: '/dashboard',
					element: <Dashboard />,
				},
				{
					path: '/boardingHouse',
					element: <BoardingHouse />,
				},
				{
					path: '/boardingHouse/tenants',
					element: <LivingTenant />,
				},
			],
		},
	],
};

export default DashboardRoutes;
