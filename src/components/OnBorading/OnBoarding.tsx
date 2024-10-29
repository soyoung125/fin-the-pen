import { Box, Button, Drawer, Stack } from "@mui/material";
import Header from "@components/OnBorading/components/Header";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { onboardings } from "@components/OnBorading/components/OnBoardingCard/asets.ts";
import OnBoardingCard from "@components/OnBorading/components/OnBoardingCard";
import { useState } from "react";
import Stepper from "@components/common/Stepper";
import "swiper/css";

function OnBoardingTutorial({ handleClose }: { handleClose: () => void }) {
  const [swiperIndex, setSwiperIndex] = useState(0);

  return (
    <Drawer
      open={true}
      anchor="bottom"
      onClose={handleClose}
      sx={{
        height: "100dvh",
        ".MuiPaper-root.MuiDrawer-paper": {
          maxHeight: "100dvh",
          height: "100dvh",
        },
      }}
    >
      <Stack
        justifyContent="space-between"
        alignItems="center"
        height="100dvh"
        width="100%"
      >
        <Header onClickHandler={handleClose} />
        <Stack spacing="25px" alignItems="center">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
            modules={[Autoplay]}
            className="mySwiper"
            style={{ width: "320px" }}
          >
            {onboardings.map((onboarding, index) => (
              <SwiperSlide key={`onboarding_${index}`}>
                <OnBoardingCard onboarding={onboarding} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Stepper size={onboardings.length} focused={swiperIndex} />
        </Stack>
        <Box
          sx={{
            paddingX: "20px",
            paddingTop: "8px",
            paddingBottom: "20px",
            width: "100%",
          }}
        >
          <Button variant="contained" onClick={handleClose} fullWidth>
            핀더펜 시작하기
          </Button>
        </Box>
      </Stack>
    </Drawer>
  );
}

export default OnBoardingTutorial;
