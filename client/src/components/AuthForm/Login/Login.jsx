import { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useRefMounted from '../../../hooks/useRefMounted';
import {
	Button,
	CircularProgress,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import { publicFetch } from '../../../config/fetch';
import { AuthContext } from '../../../context/AuthContext';

const Login = ({ onClose }) => {
	const history = useNavigate();
	const isMountedRef = useRefMounted();
	const authContext = useContext(AuthContext);
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			if (!authContext.isAuthenticated()) {
				history('/', { replace: true });
			} else {
				history('/dashboard', { replace: true });
			}
		}

		return () => {
			isMounted = false;
			isMountedRef.current = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Formik
			initialValues={{
				account: '',
				password: '',
			}}
			validationSchema={Yup.object().shape({
				account: Yup.string().max(255).required('The email  field is required'),
				password: Yup.string()
					.max(255)
					.required('The password field is required'),
			})}
			onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
				try {
					const { data } = await publicFetch.post(`/auth/login`, values);
					authContext.setAuthState(data);
					if (isMountedRef.current) {
						setStatus({ success: true });
						setSubmitting(false);
					}
					onClose(true);
				} catch (error) {
					if (isMountedRef.current) {
						setStatus({ success: false });
						setErrors({ submit: error.message });
						setSubmitting(false);
					}
				}
			}}
		>
			{({
				errors,
				handleBlur,
				handleChange,
				handleSubmit,
				isSubmitting,
				touched,
				values,
			}) => (
				<form noValidate onSubmit={handleSubmit}>
					<TextField
						error={Boolean(touched.account && errors.account)}
						fullWidth
						margin='dense'
						helperText={touched.account && errors.account}
						label={'Email/Phone number'}
						name='account'
						onBlur={handleBlur}
						onChange={handleChange}
						type='text'
						value={values.account}
						variant='filled'
					/>
					<TextField
						error={Boolean(touched.password && errors.password)}
						fullWidth
						margin='dense'
						helperText={touched.password && errors.password}
						label={'Password'}
						name='password'
						onBlur={handleBlur}
						onChange={handleChange}
						type={showPassword ? 'text' : 'password'}
						value={values.password}
						variant='filled'
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={() => setShowPassword(!showPassword)}
										onMouseDown={() => setShowPassword(!showPassword)}
										edge='end'
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<Button
						sx={{
							mt: 3,
						}}
						color='primary'
						startIcon={isSubmitting ? <CircularProgress size='1rem' /> : null}
						disabled={isSubmitting}
						type='submit'
						fullWidth
						size='large'
						variant='contained'
					>
						{'Sign in'}
					</Button>
				</form>
			)}
		</Formik>
	);
};

export default Login;
