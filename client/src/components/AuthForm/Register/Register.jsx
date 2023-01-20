import * as Yup from 'yup';
import { Formik } from 'formik';
import useRefMounted from '../../../hooks/useRefMounted';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	styled,
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import {
	regions,
	provinces,
	cities,
	barangays,
} from 'select-philippines-address';
import { useEffect, useState } from 'react';
import { publicFetch } from '../../../config/fetch';

const ButtonUploadWrapper = styled(Box)(
	({ theme }) => `
	position: absolute;
	width: ${theme.spacing(6)};
	height: ${theme.spacing(6)};
	bottom: -${theme.spacing(1)};
	right: -${theme.spacing(1)};
  `
);

const Register = () => {
	// const { register } = useAuth()
	const isMountedRef = useRefMounted();
	const [regionData, setRegion] = useState([]);
	const [provinceData, setProvince] = useState([]);
	const [cityData, setCity] = useState([]);
	const [barangayData, setBarangay] = useState([]);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState();
	const [image, setImage] = useState();

	const region = () => {
		regions().then((response) => {
			setRegion(response);
		});
	};

	const province = (e) => {
		provinces(e.target.value).then((response) => {
			setProvince(response);
			setCity([]);
			setBarangay([]);
		});
	};

	const city = (e) => {
		cities(e.target.value).then((response) => {
			setCity(response);
		});
	};

	const barangay = (e) => {
		barangays(e.target.value).then((response) => {
			setBarangay(response);
		});
	};

	useEffect(() => {
		region();
	}, []);

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	const onSelectFile = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined);
			return;
		}

		if (e.target.files[0] === undefined) {
			console.log('Please add a Profile Picture');
			return;
		}
		const data = new FormData();
		data.append('file', e.target.files[0]);
		data.append('upload_preset', 'boardingHouse');
		data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_NAME);
		fetch(
			`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
			{
				method: 'post',
				body: data,
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setImage(data.url.toString());
			})
			.catch((err) => {
				console.log(err);
			});

		// I've kept this example simple by using the first image instead of multiple
		setSelectedFile(e.target.files[0]);
	};

	return (
		<Formik
			initialValues={{
				firstName: '',
				middleName: '',
				lastName: '',
				email: '',
				contact: '',
				region: '',
				province: '',
				city: '',
				barangay: '',
				password: '',
				confirmPass: '',
				role: '',
				image: '',
			}}
			validationSchema={Yup.object().shape({
				email: Yup.string()
					.email('The email provided should be a valid email address')
					.max(255)
					.required('The email field is required'),
				firstName: Yup.string()
					.max(255)
					.required('The first name field is required'),
				middleName: Yup.string()
					.max(255)
					.required('The middle name field is required'),
				lastName: Yup.string()
					.max(255)
					.required('The last name field is required'),
				region: Yup.string().max(255).required('The region field is required'),
				province: Yup.string()
					.max(255)
					.required('The region field is required'),
				city: Yup.string().max(255).required('The region field is required'),
				barangay: Yup.string()
					.max(255)
					.required('The region field is required'),
				contact: Yup.string()
					.matches(/^(9)/, 'Must start with 9')
					.max(10, 'Must be 10 digits')
					.required('Contact number is required'),
				password: Yup.string()
					.min(8, 'At least 8 characters!')
					.max(255)
					.required('The password field is required'),
				confirmPass: Yup.string()
					.oneOf([Yup.ref('password'), null], 'Passwords must match')
					.required('Confirm your password'),
				role: Yup.string()
					.oneOf(['landlord', 'tenant'], 'Invalid user role')
					.required('Please choose a role'),
			})}
			onSubmit={async (
				values,
				{ setErrors, setStatus, setSubmitting, resetForm }
			) => {
				try {
					setSubmitting(true);
					const {
						firstName,
						middleName,
						lastName,
						email,
						contact,
						region,
						province,
						city,
						barangay,
						password,
						role,
					} = values;

					const toSendData = {
						firstName,
						middleName,
						lastName,
						email,
						contact,
						region,
						province,
						city,
						barangay,
						password,
						role,
						image,
					};
					// console.log(values);

					const { data } = await publicFetch.post(`/auth/register`, toSendData);
					console.log(data.msg);
					if (isMountedRef.current) {
						setStatus({ success: true });
						setSubmitting(false);
					}
					setPreview(null);
					resetForm(true);
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
					<Grid
						container
						spacing={2}
						alignItems='center'
						direction={{ xs: 'column-reverse', lg: 'row' }}
					>
						<Grid item xs={12} lg={8}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<FormControl fullWidth variant='filled'>
										<InputLabel id='role'>Role</InputLabel>
										<Select
											error={Boolean(touched.role && errors.role)}
											labelId='role'
											id='role'
											value={values.role}
											label='Role'
											onChange={handleChange}
											name='role'
										>
											<MenuItem value='landlord'>Landlord</MenuItem>
											<MenuItem value='tenant'>Tenant</MenuItem>
										</Select>
									</FormControl>
									{Boolean(touched.role && errors.role) && (
										<FormHelperText error>{errors.role}</FormHelperText>
									)}
								</Grid>
								<Grid item xs={12}>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={6} lg={4} xl={4}>
											<TextField
												error={Boolean(touched.firstName && errors.firstName)}
												fullWidth
												margin='dense'
												helperText={touched.firstName && errors.firstName}
												label={'First name'}
												name='firstName'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.firstName}
												variant='filled'
												onKeyPress={(evt) => {
													const alpha = /^[a-zA-Z\s]*$/;
													evt.key.replace(alpha, '') && evt.preventDefault();
												}}
											/>
										</Grid>
										<Grid item xs={12} sm={6} lg={4} xl={4}>
											<TextField
												error={Boolean(touched.middleName && errors.middleName)}
												fullWidth
												margin='dense'
												helperText={touched.middleName && errors.middleName}
												label={'Middle name'}
												name='middleName'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.middleName}
												variant='filled'
												onKeyPress={(evt) => {
													const alpha = /^[a-zA-Z\s]*$/;
													evt.key.replace(alpha, '') && evt.preventDefault();
												}}
											/>
										</Grid>
										<Grid item xs={12} sm={6} lg={4} xl={4}>
											<TextField
												error={Boolean(touched.lastName && errors.lastName)}
												fullWidth
												margin='dense'
												helperText={touched.lastName && errors.lastName}
												label={'Last name'}
												name='lastName'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.lastName}
												variant='filled'
												onKeyPress={(evt) => {
													const alpha = /^[a-zA-Z\s]*$/;
													evt.key.replace(alpha, '') && evt.preventDefault();
												}}
											/>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										error={Boolean(touched.email && errors.email)}
										fullWidth
										margin='dense'
										helperText={touched.email && errors.email}
										label={'Email address'}
										name='email'
										onBlur={handleBlur}
										onChange={handleChange}
										type='email'
										value={values.email}
										variant='filled'
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										error={Boolean(touched.contact && errors.contact)}
										fullWidth
										margin='dense'
										helperText={touched.contact && errors.contact}
										label={'Contact number'}
										name='contact'
										onBlur={handleBlur}
										onChange={handleChange}
										type='number'
										value={values.contact}
										variant='filled'
										onKeyPress={(evt) => {
											['e', 'E', '+', '-', '.'].includes(evt.key) &&
												evt.preventDefault();
										}}
										onInput={(e) => {
											e.target.value = Math.max(0, parseInt(e.target.value))
												.toString()
												.slice(0, 10);
										}}
										onWheel={(e) => e.target.blur()}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>+63</InputAdornment>
											),
										}}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} lg={4} justifyContent='center'>
							<Box
								display='flex'
								alignItems='center'
								justifyContent='center'
								flexDirection='column'
							>
								<Box sx={{ position: 'relative' }}>
									<Avatar
										variant='rounded'
										sx={{ width: 150, height: 150, borderRadius: 5 }}
									>
										{preview ? (
											<img
												src={preview}
												alt='To upload'
												width='150'
												height='150'
												aspectRatio={1 / 1}
											/>
										) : (
											<AccountBoxIcon sx={{ width: 125, height: 125 }} />
										)}
									</Avatar>
									<ButtonUploadWrapper>
										<input
											style={{ display: 'none' }}
											type='file'
											id='image'
											name='image'
											accept='image/*'
											onChange={(e) => {
												handleChange(e);
												onSelectFile(e);
											}}
										/>
										<label htmlFor='image'>
											<Button
												variant='contained'
												sx={{ borderRadius: '100%', py: 2.1 }}
												component='span'
											>
												<CloudUploadTwoToneIcon sx={{ fontSize: 28 }} />
											</Button>
										</label>
									</ButtonUploadWrapper>
								</Box>
							</Box>
						</Grid>
					</Grid>
					<Grid container spacing={2} sx={{ mt: 1 }}>
						<Grid item xs={12} sm>
							<FormControl fullWidth variant='filled'>
								<InputLabel id='region'>Region</InputLabel>
								<Select
									error={Boolean(touched.region && errors.region)}
									labelId='region'
									id='region'
									value={values.region}
									label='Region'
									onChange={(e) => {
										handleChange(e);
										province(e);
									}}
									name='region'
								>
									{regionData &&
										regionData.length > 0 &&
										regionData.map((item) => (
											<MenuItem key={item.region_code} value={item.region_code}>
												{item.region_name}
											</MenuItem>
										))}
								</Select>
							</FormControl>
							{Boolean(touched.region && errors.region) && (
								<FormHelperText error>{errors.region}</FormHelperText>
							)}
						</Grid>
						<Grid item xs={12} sm>
							<FormControl fullWidth variant='filled'>
								<InputLabel id='province'>Province</InputLabel>
								<Select
									error={Boolean(touched.province && errors.province)}
									labelId='province'
									id='province'
									value={values.province}
									label='Province'
									onChange={(e) => {
										handleChange(e);
										city(e);
									}}
									name='province'
								>
									{provinceData &&
										provinceData.length > 0 &&
										provinceData.map((item) => (
											<MenuItem
												key={item.province_code}
												value={item.province_code}
											>
												{item.province_name}
											</MenuItem>
										))}
								</Select>
							</FormControl>
							{Boolean(touched.province && errors.province) && (
								<FormHelperText error>{errors.province}</FormHelperText>
							)}
						</Grid>
						<Grid item xs={12} sm>
							<FormControl fullWidth variant='filled'>
								<InputLabel id='city'>City</InputLabel>
								<Select
									error={Boolean(touched.city && errors.city)}
									labelId='city'
									id='city'
									value={values.city}
									label='City'
									onChange={(e) => {
										handleChange(e);
										barangay(e);
									}}
									name='city'
								>
									{cityData &&
										cityData.length > 0 &&
										cityData.map((item) => (
											<MenuItem key={item.city_code} value={item.city_code}>
												{item.city_name}
											</MenuItem>
										))}
								</Select>
							</FormControl>
							{Boolean(touched.city && errors.city) && (
								<FormHelperText error>{errors.city}</FormHelperText>
							)}
						</Grid>
						<Grid item xs={12} sm>
							<FormControl fullWidth variant='filled'>
								<InputLabel id='barangay'>Barangay</InputLabel>
								<Select
									error={Boolean(touched.barangay && errors.barangay)}
									labelId='barangay'
									id='barangay'
									value={values.barangay}
									label='Barangay'
									onChange={handleChange}
									name='barangay'
								>
									{barangayData &&
										barangayData.length > 0 &&
										barangayData.map((item) => (
											<MenuItem key={item.brgy_code} value={item.brgy_code}>
												{item.brgy_name}
											</MenuItem>
										))}
								</Select>
							</FormControl>
							{Boolean(touched.barangay && errors.barangay) && (
								<FormHelperText error>{errors.barangay}</FormHelperText>
							)}
						</Grid>
					</Grid>
					<Grid container spacing={2} sx={{ mt: 1 }}>
						<Grid item xs={12} sm>
							<TextField
								error={Boolean(touched.password && errors.password)}
								fullWidth
								margin='dense'
								helperText={touched.password && errors.password}
								label={'Password'}
								name='password'
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password}
								variant='filled'
								type={showPassword ? 'text' : 'password'}
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
						</Grid>
						<Grid item xs={12} sm>
							<TextField
								error={Boolean(touched.confirmPass && errors.confirmPass)}
								fullWidth
								margin='dense'
								helperText={touched.confirmPass && errors.confirmPass}
								label={'Confirm Password'}
								name='confirmPass'
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.confirmPass}
								variant='filled'
								type={showConfirmPassword ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle confirm password visibility'
												onClick={() =>
													setShowConfirmPassword(!showConfirmPassword)
												}
												onMouseDown={() =>
													setShowConfirmPassword(!showConfirmPassword)
												}
												edge='end'
											>
												{showConfirmPassword ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
					</Grid>

					{/* {Boolean(touched.terms && errors.terms) && (
						<FormHelperText error>{errors.terms}</FormHelperText>
					)} */}
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
						{'Create your account'}
					</Button>
				</form>
			)}
		</Formik>
	);
};

export default Register;
