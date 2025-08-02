import { useEffect, useRef, useState } from "react";
import AuthButton from "./AuthButton";
import { useAuth } from "../features/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useLocalization } from "../features/localization/useLocalization";
import LanguageSelector from "./LanguageSelector";
import ThemeSettings from "./ThemeSettings";
import HamburgerUserArea from "./HamburgerUserArea";
import TextSizeSettings from "./TextSizeSettings";

const HamburgerMenu = ({
  isOpen,
  onClose,
  onHold,
  onRelease,
}: {
  isOpen: boolean;
  onClose?: () => void;
  onHold?: () => void;
  onRelease?: () => void;
}) => {
  const { currentLocale } = useLocalization();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [position, setPosition] = useState<number>(0);
  const [shouldFollow, setShouldFollow] = useState<boolean>(false);
  const [shouldGoLeft, setShouldGoLeft] = useState<boolean>(false);
  const shouldFollowRef = useRef<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleLogoutClick = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    logout();
    if (onClose) onClose();
    navigate("/");
  };

  useEffect(() => {
    const menu = menuRef.current;

    if (!menu || !isOpen) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (
        e.changedTouches[0].target instanceof HTMLElement &&
        e.changedTouches[0].target.classList.contains("no-hamburger-follow")
      )
        return;

      console.log((e.changedTouches[0].target as HTMLElement).tagName);
      touchStartX.current = e.changedTouches[0].clientX;
      touchStartY.current = e.changedTouches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX.current || !touchStartY.current) return;

      const touchCurrentX = e.changedTouches[0].clientX;
      const touchCurrentY = e.changedTouches[0].clientY;
      const xDiff = touchCurrentX - touchStartX.current;
      const yDiff = touchCurrentY - touchStartY.current;

      if (
        !shouldFollowRef.current &&
        Math.abs(xDiff) > 12 &&
        Math.abs(yDiff) < 12
      ) {
        setShouldFollow(true);
        shouldFollowRef.current = true;
        document.body.style.overflow = "hidden";
        if (onHold) onHold();
      }

      setPosition(xDiff);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartX.current || !touchStartY.current) return;

      if (!shouldFollowRef.current) {
        touchStartX.current = null;
        touchStartY.current = null;
        document.body.style.overflow = "";
        if (onRelease) onRelease();
        return;
      }

      const touchEndX = e.changedTouches[0].clientX;
      const xDiff = touchEndX - touchStartX.current;

      if (xDiff > 96) {
        if (onClose) onClose();
        setShouldGoLeft(false);
      } else if (xDiff < -96) {
        if (onClose) onClose();
        setShouldGoLeft(true);
      }

      touchStartX.current = null;
      touchStartY.current = null;
      setShouldFollow(false);
      shouldFollowRef.current = false;
      if (onRelease) onRelease();
    };

    menu.addEventListener("touchstart", handleTouchStart);
    menu.addEventListener("touchmove", handleTouchMove);
    menu.addEventListener("touchend", handleTouchEnd);

    return () => {
      menu.removeEventListener("touchstart", handleTouchStart);
      menu.removeEventListener("touchmove", handleTouchMove);
      menu.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOpen, onClose, onHold, onRelease]);

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const setHeight = () => {
      menu.style.height = `${window.innerHeight}px`;
    };

    setHeight();
    window.addEventListener("resize", setHeight);

    return () => window.removeEventListener("resize", setHeight);
  }, [isOpen]);

  return (
    <>
      <div
        className={`pointer-events-none fixed left-0 top-0 z-99 w-screen h-screen bg-black
          ${isOpen ? "opacity-40" : "opacity-0"} transition-opacity duration-250`}
      />
      <div
        ref={menuRef}
        aria-expanded={isOpen}
        style={{
          transform: !isOpen
            ? shouldGoLeft
              ? "translateX(-100%)"
              : "translateX(100%)"
            : shouldFollow
              ? `translateX(calc(${position}px))`
              : "translateX(0)",
        }}
        className={`fixed left-0 top-0 z-100 flex flex-col flex-1 w-screen h-dvh overflow-auto
          touch-pan-x bg-background-200 dark:bg-background-dark-300 ${ !shouldFollow &&
          "transition-transform duration-100" }`}
      >
        <div className="overflow-auto touch-pan-y flex flex-col flex-1 p-6 pt-18">
          <div className="flex w-full mb-10.5">
            <HamburgerUserArea
              onLogin={onClose}
              onSignUp={onClose}
              onAccountClick={onClose}
            />
          </div>
          <div className="flex flex-col flex-1 items-center justify-between gap-4">
            <div className="flex flex-col items-center gap-5.25 w-full">
              <LanguageSelector selectWidth="50%" />
              <div
                className="w-full h-px will-change-transform bg-primary-100 dark:bg-primary-dark-100
                  opacity-20"
              ></div>
              <ThemeSettings toggleWidth="50%" />
              <div
                className="w-full h-px will-change-transform bg-primary-100 dark:bg-primary-dark-100
                  opacity-20"
              ></div>
              <TextSizeSettings controlsWidth="50%" />
            </div>
            {currentUser && (
              <div className="w-full">
                <AuthButton
                  label={currentLocale.auth.logout}
                  onClick={handleLogoutClick}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
