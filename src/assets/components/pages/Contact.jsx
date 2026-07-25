import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  Card,
  Button,
  TextField,
  Stack,
  Typography,
  Container,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import DS from "../../../theme/designSystem";
import PageBanner from "../ui/PageBanner";

const ContactSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email address is required"),
  subject: Yup.string()
    .min(5, "Subject should be more descriptive")
    .required("Subject is required"),
  message: Yup.string()
    .min(10, "Please provide more details")
    .required("Message body is required"),
});

const Contact = () => {
  const formik = useFormik({
    initialValues: { fullName: "", email: "", subject: "", message: "" },
    validationSchema: ContactSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("We will contact you soon", {
          duration: 4000,
          position: "top-right",
          style: {
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 500,
            background: "#111827",
            color: "#FFF",
          },
        });
        resetForm();
      } catch (error) {
        toast.error("Transmission dropped.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: DS.colors.bg, pb: 10 }}>
      <PageBanner
        title="Contact Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <Container maxWidth="md" sx={{ mt: { xs: 3, md: 4 } }}>
        <Card
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            bgcolor: DS.colors.white,
            border: `1px solid ${DS.colors.border}`,
            borderRadius: DS.radii.lg,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <ShieldRoundedIcon sx={{ color: DS.colors.primary, fontSize: 18 }} />
            <Typography
              sx={{
                ...DS.typography.label,
                color: DS.colors.primary,
                fontSize: "0.78rem",
              }}
            >
              Secure Dispatch Node
            </Typography>
          </Stack>

          <Typography
            sx={{
              ...DS.typography.h3,
              color: DS.colors.heading,
              mb: 3,
              fontSize: "1.25rem",
            }}
          >
            System Inquiry Form
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                id="fullName"
                name="fullName"
                label="Full Name"
                variant="outlined"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
                sx={DS.input}
              />

              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                variant="outlined"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={DS.input}
              />

              <TextField
                fullWidth
                id="subject"
                name="subject"
                label="Subject Brief"
                variant="outlined"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
                sx={DS.input}
              />

              <TextField
                fullWidth
                id="message"
                name="message"
                label="Project Parameters Brief"
                variant="outlined"
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
                sx={DS.input}
              />

              <Button
                type="submit"
                variant="contained"
                disableElevation
                disabled={formik.isSubmitting}
                endIcon={<SendRoundedIcon sx={{ fontSize: 16 }} />}
                sx={{
                  ...DS.button.primary,
                  py: 1.3,
                  width: "100%",
                  fontSize: "0.9rem",
                  "&.Mui-disabled": {
                    bgcolor: DS.colors.border,
                    color: DS.colors.muted,
                  },
                }}
              >
                {formik.isSubmitting ? "Transmitting..." : "Send Message"}
              </Button>
            </Stack>
          </Box>
        </Card>

        <Toaster />
      </Container>
    </Box>
  );
};

export default Contact;
