import Navbar from "@/components/layout/navbar";
import { DesktopUserMenuWrapper } from "./style";
import UserMenuDesktop from "./user-menu-desktop";
import SearchBarDesktop from "./search-bar-desktop";

export default function MainMenuDesktop(props) {
  return (
    <>
      <DesktopUserMenuWrapper className="desktop-menu">
        <SearchBarDesktop {...props}/>
        <UserMenuDesktop {...props} />
      </DesktopUserMenuWrapper>
    </>
  );
}
