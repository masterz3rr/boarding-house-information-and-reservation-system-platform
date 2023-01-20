import { useRoutes } from 'react-router-dom';
import UserRoutes from './UserRoutes';
import DashboardRoutes from './DashboardRoutes';
import routeConfig from '../config/routeConfig';

export default function Routes() {
	return useRoutes([UserRoutes, DashboardRoutes], routeConfig.basename);
}
