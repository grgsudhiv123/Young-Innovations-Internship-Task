import {
  ChartBarIcon,
  ChatCircleDotsIcon,
  CreditCardIcon,
  GearIcon,
  PlusCircleIcon,
  StackIcon,
} from "@phosphor-icons/react";
import { PageRoutes } from "../../enum/routes";

export const SidebarConstant = [
  {
    title: "Dashboard",
    path: PageRoutes.HOME,
    icon: <ChartBarIcon size={24} />,
  },
  {
    title: "Create New Course",
    path: PageRoutes.CREATE_NEW_COURSE,
    icon: <PlusCircleIcon size={24} />,
  },
  {
    title: "My Courses",
    path: PageRoutes.MY_COURSE,
    icon: <StackIcon size={24} />,
  },
  {
    title: "Earning",
    path: PageRoutes.EARNING,
    icon: <CreditCardIcon size={24} />,
  },
  {
    title: "Message",
    path: PageRoutes.MESSAGE,
    icon: <ChatCircleDotsIcon size={24} />,
  },
  {
    title: "Setting",
    path: PageRoutes.SETTING,
    icon: <GearIcon size={24} />,
  },
];
