import { Suspense, lazy, useContext } from 'react';
import Layout from '../../layouts/Layout';
import { Navigate, Outlet } from 'react-router-dom';
import SuspenseLoader from '../../components/SuspenseLoader';
import { AuthContext } from '../../context/AuthContext';

const Loader = (Component) => (props) =>
	(
		<Suspense fallback={<SuspenseLoader />}>
			<Component {...props} />
		</Suspense>
	);
const Home = Loader(lazy(() => import('../../pages/Home')));

const UserRoute = ({ children, ...rest }) => {
	const authContext = useContext(AuthContext);

	// if (!authContext.isAuthenticated() && authContext.isTenant()) {
	// 	return <Outlet />;
	// }
	// if (!authContext.isAdmin()) return <Outlet />;

	if (
		authContext.isAuthorized() ||
		authContext.isAdmin() ||
		authContext.isLandlord()
	) {
		return <Navigate to='/dashboard' />;
	}
	return <Outlet />;
};

const UserRoutes = {
	path: '/',
	element: <Layout />,
	children: [
		{
			path: '/',
			element: <UserRoute />,
			children: [
				{
					path: '/',
					element: <Home />,
				},
			],
		},
	],
};

export default UserRoutes;
