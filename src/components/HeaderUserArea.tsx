import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";
import { useEffect, useRef } from "react";
import AuthButton from "./AuthButton";
import AccountIcon from "../assets/account-icon.svg?react";
import { useLocalization } from "../features/localization/useLocalization";
import { useTooltip } from "../features/tooltip/useTooltip";
import LogoutIcon from "../assets/logout-icon.svg?react";

const HeaderUserArea = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const accountButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { currentLocale } = useLocalization();
  const tooltip = useTooltip();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleUserClick = () => {
    const isHidden = dropdownRef.current?.classList.contains("hidden");

    accountButtonRef.current?.focus();

    if (isHidden) {
      dropdownRef.current?.classList.remove("hidden");
      dropdownRef.current?.classList.add("flex");
    } else {
      dropdownRef.current?.classList.remove("flex");
      dropdownRef.current?.classList.add("hidden");
      accountButtonRef.current?.blur();
    }

    tooltip.hideTooltip();
  };

  const handleAccountClick = () => {
    navigate("/account");
  };
  const handleSignUpClick = () => {
    navigate("/signup");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.classList.contains("hidden") &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        dropdownRef.current?.classList.remove("flex");
        dropdownRef.current?.classList.add("hidden");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {currentUser ? (
        <div
          ref={containerRef}
          className="relative flex items-center justify-end gap-3"
        >
          <AuthButton
            label={currentLocale.auth.logout}
            onClick={handleLogoutClick}
            isCollapsible={true}
            collapseLabel={<LogoutIcon className="w-4.5" />}
            className="h-8! rounded-2xl"
          ></AuthButton>
          <div
            onClick={handleAccountClick}
            className="flex group items-center gap-2 cursor-pointer"
            onMouseEnter={() => {
              tooltip.showTooltip(
                400,
                "md",
                currentLocale.navigation.accountSettings,
              );
            }}
            onMouseLeave={() => tooltip.hideTooltip()}
          >
            <button
              onClick={handleUserClick}
              className="text-sm select-none cursor-pointer transition-all duration-180
                text-secondary-100 dark:text-secondary-dark-100 h-full flex items-center
                justify-center group-hover:text-secondary-200
                dark:group-hover:text-secondary-dark-200 hover:text-secondary-200
                dark:hover:text-secondary-dark-200 focus-visible:text-secondary-200
                dark:focus-visible:text-secondary-dark-200 active:text-secondary-300
                dark:active:text-secondary-dark-300 group-focus-visible:text-secondary-200
                dark:group-focus-visible:text-secondary-dark-200 group-active:text-secondary-300
                dark:group-active:text-secondary-dark-300"
              aria-label={currentLocale.navigation.accountSettings}
            >
              {currentUser.displayName}
            </button>
            <button
              className="cursor-pointer"
              ref={accountButtonRef}
              onClick={handleUserClick}
              aria-label={currentLocale.navigation.accountSettings}
            >
              <AccountIcon
                className="cursor-pointer w-8 h-8 text-secondary-100 dark:text-secondary-dark-100
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
            </button>
          </div>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="relative flex items-center justify-end w-1/5"
        >
          <div className="flex items-center gap-2">
            <AuthButton
              label={currentLocale.auth.login}
              onClick={handleLoginClick}
            />
            <AuthButton
              label={currentLocale.auth.signUp}
              onClick={handleSignUpClick}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderUserArea;
