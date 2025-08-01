import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg?react";
import HeaderSettingsArea from "./HeaderSettingsArea";
import HeaderUserArea from "./HeaderUserArea";
import HamburgerButton from "./HamburgerButton";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full z-50 flex items-center mb-6 pl-2 pr-2 relative">
      <div
        className="flex gap-2 items-center justify-center md:absolute md:left-1/2
          md:-translate-x-1/2"
      >
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex gap-2 items-center justify-center"
        >
          <Logo className="select-none w-6 md:w-10 text-primary-200 dark:text-primary-dark-200" />
          <div
            className="select-none font-bold md:text-[1.25rem] bg-clip-text text-transparent
              bg-gradient-to-r from-primary-200 to-primary-100 dark:from-primary-dark-200
              dark:to-primary-dark-100"
          >
            AI Translate
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-1 justify-between">
        <HeaderSettingsArea />
        <HeaderUserArea />
      </div>
      <div className="flex md:hidden flex-1 justify-end">
        <HamburgerButton />
      </div>
    </header>
  );
};

export default Header;
