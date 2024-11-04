export interface User {
  id?: number;
  user_id: string;
  name: string;
  // bday: string;
  // registerDate: string;
  // phone_number: string;
  user_type?: string;
  refreshToken?: string;
}

export interface MockUser extends User {
  password: string;
}

export interface SignUp {
  user_id: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  name: FormDataEntryValue | null;
  phone_number: FormDataEntryValue | null;
}

export interface SignIn {
  user_id: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

export type SocialLoginType = "kakao" | "naver";

export type SocialLoginStateType = {
  [key in SocialLoginType]: {
    image: string;
    path: string;
  };
};
