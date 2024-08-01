import { PageEnum } from "@/types/enums";
import { useNavigate } from "react-router-dom";

export const useCheckedNavigation = () => {
  return (page: PageEnum) => {
    const navigate = useNavigate();
    if (location.pathname !== page) navigate(page);
  }
}