import { useEffect, useRef } from "react";
import GearButton from "./GearButton";
import DropdownMenu from "./DropdownMenu";
import { useTheme } from "../features/theme/useTheme";
import ToggleButton from "./ToggleButton";
import { useLocalization } from "../features/localization/useLocalization";
import LanguageSelector from "./LanguageSelector";

const HeaderSettingsArea = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const gearButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { currentLocale } = useLocalization();
  const { currentTheme, setLightTheme, setDarkTheme } = useTheme();

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
        className="relative flex items-center justify-start"
      >
        <GearButton ref={gearButtonRef} onClick={handleGearClick} />

        <DropdownMenu ref={dropdownRef} className="min-w-40">
          <LanguageSelector />
          <ToggleButton
            label={currentLocale.settings.theme}
            offText={currentLocale.settings.light}
            onText={currentLocale.settings.dark}
            onTurnOff={setLightTheme}
            onTurnOn={setDarkTheme}
            check={currentTheme === "dark"}
          />
        </DropdownMenu>
      </div>
    </>
  );
};

export default HeaderSettingsArea;
