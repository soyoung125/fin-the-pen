import onboarding1 from "@assets/icons/onboarding1.svg";
import onboarding2 from "@assets/icons/onboarding2.svg";
import onboarding3 from "@assets/icons/onboarding3.svg";

export interface IOnboarding {
  title: string;
  image: string;
}

export const onboardings: IOnboarding[] = [
  { title: "일정이 많아지면\n지출도 높아지시나요?", image: onboarding1 },
  { title: "계획된 일정에 맞는\n자산관리도 필요하신가요?", image: onboarding2 },
  {
    title: "캘린더와 가계부를\n통합한 핀더펜을 사용해보세요",
    image: onboarding3,
  },
];
