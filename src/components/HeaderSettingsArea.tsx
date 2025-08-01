import { useEffect, useRef } from "react";
import SettingsIcon from "../assets/settings-icon.svg?react";
import DropdownMenu from "./DropdownMenu";
import { useLocalization } from "../features/localization/useLocalization";
import LanguageSelector from "./LanguageSelector";
import { useTooltip } from "../features/tooltip/useTooltip";
import ThemeSettings from "./ThemeSettings";
import TextSizeSettings from "./TextSizeSettings";

const HeaderSettingsArea = ({ className }: { className?: string }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const gearButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { currentLocale } = useLocalization();
  const tooltip = useTooltip();

  const handleGearClick = () => {
    const isHidden = dropdownRef.current?.classList.contains("hidden");

    gearButtonRef.current?.focus();

    if (isHidden) {
      dropdownRef.current?.classList.remove("hidden");
      dropdownRef.current?.classList.add("flex");
    } else {
      dropdownRef.current?.classList.remove("flex");
      dropdownRef.current?.classList.add("hidden");
      gearButtonRef.current?.blur();
    }

    tooltip.hideTooltip();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.classList.contains("hidden") &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        dropdownRef.current.classList.remove("flex");
        dropdownRef.current.classList.add("hidden");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className={"relative flex items-center justify-start " + className}
      >
        <button
          ref={gearButtonRef}
          onClick={handleGearClick}
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
          aria-label={currentLocale.navigation.appSettings}
          onMouseEnter={() => {
            tooltip.showTooltip(
              400,
              "md",
              currentLocale.navigation.appSettings,
            );
          }}
          onMouseLeave={() => tooltip.hideTooltip()}
        >
          <SettingsIcon className="w-7 md:w-8" />
        </button>

        <DropdownMenu ref={dropdownRef} className="min-w-40">
          <LanguageSelector />
          <ThemeSettings />
          <TextSizeSettings />
        </DropdownMenu>
      </div>
    </>
  );
};

export default HeaderSettingsArea;
