import {
  Alert,
  Box,
  Button,
  Dialog,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import LogoCircle from "../common/LogoCircle.tsx";
import { useAppDispatch, useAppSelector } from "@redux/hooks.ts";
import {
  selectIsAuthenticated,
  setIsAuthenticatedTrue,
} from "@redux/slices/commonSlice.tsx";
import Keypad from "@components/sign/Keypad.tsx";
import BackButton from "@components/layouts/common/TopBar/buttons/BackButton.tsx";
import { useUser } from "@app/tanstack-query/useUser.ts";

interface EasyAuthenticationProps {
  handleAuthenticate?: () => void;
}

function EasyAuthentication({ handleAuthenticate }: EasyAuthenticationProps) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const CHARACTER_LIMIT = 6;
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { data: user } = useUser();

  const [password, setPassword] = useState<number[]>([]);

  const handleClick = () => {
    if (CHARACTER_LIMIT === password.length) {
      dispatch(setIsAuthenticatedTrue());
      handleAuthenticate && handleAuthenticate();
    }
  };

  return user ? (
    <Dialog fullScreen open={!isAuthenticated}>
      <Box width="100%" px={2} pt={2}>
        <BackButton />
      </Box>
      <Grid
        container
        height="100%"
        columns={{ xs: 1, sm: 1, md: 2 }}
        justifyContent="space-between"
      >
        <Grid size="grow">
          <Stack justifyContent="center" alignItems="center" height="100%">
            <LogoCircle />

            <Box my={2} sx={{ typography: "h5", fontWeight: "bold" }}>
              비밀번호 입력
            </Box>

            <Box
              sx={{
                fontWeight: "bold",
                fontSize: "17px",
                color: "primary.main",
              }}
              mb={3}
            >
              설정하신 PIN 6자리를 입력해주세요.
            </Box>

            <Box
              component="form"
              noValidate
              sx={{ maxWidth: "300px", width: "100%" }}
              px={1}
            >
              <Stack direction="row" spacing={1} mb={1} justifyItems="center">
                {[...Array(CHARACTER_LIMIT)].map((d, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "100%",
                      height: "56px",
                      border: "2px solid",
                      borderColor: "primary.main",
                      borderRadius: 1,
                      backgroundColor:
                        index < password.length
                          ? "rgba(115, 91, 242, 0.6)"
                          : "white",
                    }}
                  >
                    <Box
                      sx={{
                        color: "white",
                        fontSize: "45px",
                        textAlign: "center",
                      }}
                    >
                      *
                    </Box>
                  </Box>
                ))}
              </Stack>
              {CHARACTER_LIMIT === password.length && (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleClick()}
                >
                  인증
                </Button>
              )}
            </Box>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 1 }} alignSelf="center">
          <Keypad
            isRandom={true}
            setPassword={setPassword}
            currentLength={password.length}
            maxLength={CHARACTER_LIMIT}
          />
        </Grid>
      </Grid>
    </Dialog>
  ) : (
    <Alert severity="error" sx={{ m: 3 }}>
      로그인이 필요한 페이지입니다.
    </Alert>
  );
}

export default EasyAuthentication;
