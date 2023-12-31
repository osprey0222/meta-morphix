import { Box, Typography } from "@mui/material";
import Modal from "..";
import TextField from "../../fields/TextField";
import { useState } from "react";
import { useVerifyUser } from "../../../hooks/user.hooks";
import { toast } from "react-toastify";

interface VerifiactionModalProps {
  open: boolean;
  setOpen: (p: boolean) => void;
  email: string;
  onSuccess?: () => void;
}

export const VerificationModal = (props: VerifiactionModalProps) => {
  const { open, setOpen, email, onSuccess } = props;
  const [code, setCode] = useState<number | null>(null);
  const { mutate: verifyUser, isLoading } = useVerifyUser();

  const handleVerificationCode = (code: string) => {
    if (code) {
      if (code.length <= 6) {
        setCode(Number(code));
      }
    } else {
      setCode(null);
    }
  };

  const handleVerifyUser = () => {
    verifyUser({
      payload: { code: code.toString(), email },
      callback: (isSuccess, message) => {
        if (isSuccess) {
          toast.success("Verified Successfully.");
          onSuccess();
          setOpen(false);
        } else {
          toast.error(message);
        }
      },
    });
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Email Verification"
      onSuccess={handleVerifyUser}
      successBtnText="Verify"
      isDisabled={!code}
      isLoading={isLoading}
      onClose={() => setCode(null)}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={1}
      >
        <Typography variant="body2">
          Enter 6-digit verification code sent to "{email}"
        </Typography>
        <TextField
          variant="filled"
          type="number"
          value={String(code)}
          onChange={handleVerificationCode}
          label="Verification Code"
          sx={{ mx: 0, my: 2, width: "50%", spacing: 212 }}
          InputProps={{ style: { fontSize: 30, letterSpacing: 18 } }}
          placeholder="000000"
        />
      </Box>
    </Modal>
  );
};
