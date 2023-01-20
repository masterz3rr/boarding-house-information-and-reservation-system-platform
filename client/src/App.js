import { AuthProvider } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';
import Routes from './routes';
import { CssBaseline, ThemeProvider } from '@mui/material';

const App = () => {
	return (
		<AuthProvider>
			<FetchProvider>
				<Routes />
				<CssBaseline />
			</FetchProvider>
		</AuthProvider>
	);
};

export default App;
