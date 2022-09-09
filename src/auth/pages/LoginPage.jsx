import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout';

const formData = {
	email: '',
	password: ''
};

export const LoginPage = () => {

	const { status, errorMessage } = useSelector(state => state.auth);

	const { email, password, onInputChange, formState } = useForm(formData);

	const dispatch = useDispatch();

	const isAuthenticating = useMemo(() => status === 'checking', [status]);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(startLoginWithEmailPassword(formState))
	}

	const onGoogleSignIn = () => {
		dispatch(startGoogleSignIn());
	}

	return (
		<AuthLayout title='Login'>
			<form
				aria-label="submit-form"
				onSubmit={onSubmit}
				className="animate__animated animate__fadeIn animate__faster">
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Correo'
							type='email'
							placeholder="correo@google.com"
							fullWidth
							name='email'
							value={email}
							onChange={onInputChange}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Contrasena"
							type="password"
							placeholder="Contrasena"
							fullWidth
							name='password'
							value={password}
							onChange={onInputChange}
							inputProps={{
								'data-testid': 'password'
							}}
						/>
					</Grid>

					<Grid item xs={12} display={!!errorMessage ? '' : 'none'} sx={{ mt: 1 }}>
						<Alert severity='error'>
							{errorMessage}
						</Alert>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} sm={6}>
							<Button
								variant='contained'
								fullWidth
								type='submit'
								disabled={isAuthenticating}
							>
								Login
							</Button>
						</Grid>

						<Grid item xs={12} sm={6}>
							<Button
								variant='contained'
								fullWidth
								onClick={onGoogleSignIn}
								disabled={isAuthenticating}
								aria-label="btnGoogleSignIn"
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>

					</Grid>

					<Grid container direction="row" justifyContent="end">
						<Link component={RouterLink} color="inherit" to="/auth/register">
							Crear una cuenta
						</Link>
					</Grid>

				</Grid>
			</form>

		</AuthLayout>
	)
}
