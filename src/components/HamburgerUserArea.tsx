import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";
import { useRef } from "react";
import AuthButton from "./AuthButton";
import AccountIcon from "../assets/account-icon.svg?react";
import { useLocalization } from "../features/localization/useLocalization";
import { useTooltip } from "../features/tooltip/useTooltip";

const HamburgerUserArea = ({
  onLogin,
  onSignUp,
  onAccountClick,
  className,
}: {
  onLogin?: () => void;
  onSignUp?: () => void;
  onAccountClick?: () => void;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { currentLocale } = useLocalization();
  const tooltip = useTooltip();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (onAccountClick) onAccountClick();
    navigate("/account");
  };
  const handleSignUpClick = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (onSignUp) onSignUp();
    navigate("/signup");
  };
  const handleLoginClick = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (onLogin) onLogin();
    navigate("/login");
  };

  return (
    <>
      {currentUser ? (
        <div
          ref={containerRef}
          className={
            "relative flex flex-1 items-center justify-between gap-3 " +
            className
          }
        >
          <div
            onClick={handleAccountClick}
            className={"flex group items-center gap-2 cursor-pointer"}
            onMouseEnter={() => {
              tooltip.showTooltip(
                400,
                "md",
                currentLocale.navigation.accountSettings,
              );
            }}
            onMouseLeave={() => tooltip.hideTooltip()}
          >
            <AccountIcon
              className="cursor-pointer w-7 md:w-8 text-secondary-100 dark:text-secondary-dark-100
                transition-all duration-180 outline-none group-hover:text-secondary-200
                dark:group-hover:text-secondary-dark-200 hover:text-secondary-200
                dark:hover:text-secondary-dark-200 focus-visible:text-secondary-200
                dark:focus-visible:text-secondary-dark-200
                group-focus-visible:text-secondary-200
                dark:group-focus-visible:text-secondary-dark-200 focus:text-secondary-200
                dark:focus:text-secondary-dark-200 active:text-secondary-300
                dark:active:text-secondary-dark-300 group-active:text-secondary-300
                dark:group-active:text-secondary-dark-300"
            />
            <div
              className="text-sm select-none cursor-pointer transition-all duration-180
                text-secondary-100 dark:text-secondary-dark-100 h-full flex items-center
                justify-center group-hover:text-secondary-200
                dark:group-hover:text-secondary-dark-200 hover:text-secondary-200
                dark:hover:text-secondary-dark-200 focus-visible:text-secondary-200
                dark:focus-visible:text-secondary-dark-200 active:text-secondary-300
                dark:active:text-secondary-dark-300 group-focus-visible:text-secondary-200
                dark:group-focus-visible:text-secondary-dark-200 group-active:text-secondary-300
                dark:group-active:text-secondary-dark-300"
            >
              {currentUser.displayName}
            </div>
          </div>
          <AuthButton
            label={currentLocale.navigation.accountSettings}
            onClick={handleAccountClick}
            className="flex-1 max-w-1/2 rounded-2xl"
          />
        </div>
      ) : (
        <div ref={containerRef} className="relative flex items-center w-full">
          <div className="flex items-center gap-2 w-full">
            <AuthButton
              label={currentLocale.auth.login}
              onClick={handleLoginClick}
              className="w-1/2"
            />
            <AuthButton
              label={currentLocale.auth.signUp}
              onClick={handleSignUpClick}
              className="w-1/2"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HamburgerUserArea;
