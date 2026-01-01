import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
} from "../../components/icons/icons";

export const SigninConstants = [
  {
    link: "https://accounts.google.com/v3/signin/identifier?dsh=S1812573153%3A1655944654029516&flowEntry=ServiceLogin&flowName=WebLiteSignIn&ifkv=AX3vH39E0iYVTmn-NoMNM_C35EPrno8LWsRx2Qhr0HApkVLZ-Zc_Vql8ouaSQOiXzEmthrpOPAV5",
    icon: <GoogleIcon />,
    label: "Google",
  },
  {
    link: "https://www.facebook.com/login/",
    icon: <FacebookIcon />,
    label: "Facebook",
  },
  {
    link: "https://account.apple.com/sign-in",
    icon: <AppleIcon />,
    label: "Apple",
  },
];
