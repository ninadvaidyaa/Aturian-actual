import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

import { loginFormSchema } from "validators/auth.validators";
import type { LoginFormData } from "validators/auth.validators";
import IconButton from "components/@extended/IconButton";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [capsWarning, setCapsWarning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onBlur",
    resolver: zodResolver(loginFormSchema),
  });
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };
  const onKeyDown = (keyEvent: any) => {
    if (keyEvent.getModifierState("CapsLock")) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
        >
          <Stack spacing={1}>
            <InputLabel htmlFor="userName">Username:</InputLabel>
            <OutlinedInput
              type="email"
              id="userName"
              {...register("username")}
              placeholder="Enter username"
              fullWidth
            />
            {errors.username && (
              <FormHelperText
                error
                id="standard-weight-helper-text-email-login"
              >
                {errors.username.message}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Stack spacing={1}>
            <InputLabel htmlFor="password">Password:</InputLabel>
            <OutlinedInput
              id="password"
              color={capsWarning ? "warning" : "primary"}
              type={showPassword ? "text" : "password"}
              onKeyDown={onKeyDown}
              placeholder="Enter password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="secondary"
                  >
                    {showPassword ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              fullWidth
              {...register("password", { required: true })}
            />
            {capsWarning && (
              <Typography
                variant="caption"
                sx={{ color: "warning.main" }}
                id="warning-helper-text-password-login"
              >
                Caps lock on!
              </Typography>
            )}
            {errors.password && (
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
              >
                {errors.password.message}
              </FormHelperText>
            )}
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
        >
          <button className="mb-2 mr-2 w-full  rounded-lg bg-skin-fill px-5 py-2.5 text-sm font-medium text-white focus:ring-4 focus:ring-blue-300 ">
            Login
          </button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
