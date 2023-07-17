import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/VpnKey";
import Link from "next/link";
import PasswordField from "../fields/PasswordField";
import TextField from "../fields/TextField";
import Button from "../buttons/Button";
import { useLoginUser } from "../../hooks/user.hooks";
import { LoginUserPayload } from "../../services/user.services";
import { toast } from "react-toastify";
import { VerificationModal } from "../modals/verification";
import { useRouter } from "next/router";
import { ROUTES } from "../../constants/routes";

export const LoginForm = () => {
  const { mutate: loginUser, isLoading } = useLoginUser();
  const [fields, setFields] = useState<LoginUserPayload>({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = () => {
    loginUser({
      payload: { email: fields.email, password: fields.password },
      callback: (isSuccess: boolean, message: string, status?: number) => {
        if (isSuccess) {
          router.push(ROUTES.dashboard);
        } else {
          if (status === 401) {
            setOpen(true);
          } else {
            toast.error(message);
          }
        }
      },
    });
  };

  return (
    <>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <LoginIcon sx={{ mr: 1 }} />
          <Typography sx={{ my: 3 }} variant="h6">
            Login
          </Typography>
        </Box>

        <TextField
          label="Email"
          type="email"
          value={fields.email}
          onChange={(email) => setFields({ ...fields, email })}
          required
        />

        <PasswordField
          value={fields.password}
          onChange={(password) => setFields({ ...fields, password })}
          required
        />

        <Button
          sx={{ my: 2 }}
          onClick={handleLogin}
          label={"Login"}
          isLoading={isLoading}
        />

        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link href={"/app/register"}>
            <Typography variant="body2">Forgot Password?</Typography>
          </Link>
          <Link href={"/app/register"}>
            <Typography variant="body2">New here? Register.</Typography>
          </Link>
        </Box>
      </Box>
      <VerificationModal
        open={open}
        setOpen={(p) => setOpen(p)}
        email={fields.email}
        onSuccess={() => router.push(ROUTES.dashboard)}
      />
    </>
  );
};
