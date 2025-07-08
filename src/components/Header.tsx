import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg?react";
import HeaderSettingsArea from "./HeaderSettingsArea";
import HeaderUserArea from "./HeaderUserArea";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full z-50 min-h-12 flex items-center justify-center mb-6 pl-2 pr-2">
      <HeaderSettingsArea />
      <div className="flex gap-2 items-center justify-center flex-1">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex gap-2 items-center justify-center"
        >
          <Logo className="select-none w-10 h-10 text-primary-200 dark:text-primary-dark-200" />
          <div
            className="select-none font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r
              from-primary-200 to-primary-100 dark:from-primary-dark-200
              dark:to-primary-dark-100"
          >
            AI Translate
          </div>
        </div>
      </div>
      <HeaderUserArea />
    </header>
  );
};

export default Header;
