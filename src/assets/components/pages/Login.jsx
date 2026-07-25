import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Alert, Box, Button, IconButton, InputAdornment, Snackbar,
  Stack, TextField, Typography, Link
} from '@mui/material'
import { Visibility, VisibilityOff, Bolt } from '@mui/icons-material'
import { useFormik } from 'formik'
import { loginUser } from '../../../redux/slices/authSlice'
import DS from '../../../theme/designSystem'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)
  const [showPassword, setShowPassword] = React.useState(false)
  const [snackbar, setSnackbar] = React.useState({ open: false, severity: 'error', message: '' })

  React.useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true })
  }, [isAuthenticated, navigate])

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validate: (values) => {
      const errors = {}
      if (!values.email.trim()) {
        errors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Enter a valid email address'
      }
      if (!values.password) {
        errors.password = 'Password is required'
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
      }
      return errors
    },
    onSubmit: async (values, { setFieldError }) => {
      const result = await dispatch(loginUser({ email: values.email, password: values.password }))
      if (loginUser.rejected.match(result)) {
        const msg = result.payload
        setFieldError('email', msg)
        setSnackbar({ open: true, severity: 'error', message: msg })
      } else {
        navigate('/', { replace: true })
      }
    },
  })

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left — Branding Panel */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '45%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0F5E36 0%, #157347 50%, #1A8C57 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <Box sx={{ position: 'absolute', bottom: -120, left: -60, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <Box sx={{ position: 'relative', textAlign: 'center', px: 4 }}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: DS.radii.md,
              bgcolor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              backdropFilter: 'blur(8px)',
            }}
          >
            <Bolt sx={{ fontSize: 40, color: '#fff' }} />
          </Box>
          <Typography sx={{ ...DS.typography.h2, color: '#fff', mb: 1.5, fontSize: '1.75rem' }}>
            NGN Enterprises
          </Typography>
          <Typography sx={{ ...DS.typography.body, color: 'rgba(255,255,255,0.8)', maxWidth: 320, mx: 'auto', lineHeight: 1.7 }}>
            Sign in to access your account, track orders, and manage your profile.
          </Typography>
        </Box>
      </Box>

      {/* Right — Login Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: { xs: 3, sm: 6 },
          py: 4,
          bgcolor: DS.colors.white,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 420 }}>
          {/* Mobile logo */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5, mb: 4 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: DS.radii.md,
                bgcolor: DS.colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Bolt sx={{ color: '#fff', fontSize: 26 }} />
            </Box>
            <Typography sx={{ ...DS.typography.h5, fontWeight: 700 }}>NGN Enterprises</Typography>
          </Box>

          <Typography sx={{ ...DS.typography.h3, mb: 0.5, fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
            Sign in
          </Typography>
          <Typography sx={{ ...DS.typography.body, mb: 3.5, color: DS.colors.sub }}>
            Enter your credentials to access your account.
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
                fullWidth
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={DS.input}
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={DS.input}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((p) => !p)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disableElevation
                disabled={loading}
                sx={{
                  ...DS.button.primary,
                  py: 1.3,
                  fontSize: '0.95rem',
                }}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </Stack>
          </Box>

          <Typography sx={{ ...DS.typography.body, mt: 3, textAlign: 'center', color: DS.colors.sub }}>
            Don&apos;t have an account?{' '}
            <Link
              component={RouterLink}
              to="/register"
              sx={{
                color: DS.colors.primary,
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: DS.radii.md, fontFamily: DS.fonts.body }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Login
