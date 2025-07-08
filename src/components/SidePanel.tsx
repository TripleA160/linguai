import { useRef, useState, type ReactNode } from "react";
import { useTooltip } from "../features/tooltip/useTooltip";
import { random } from "lodash";

type Props = {
  label: string;
  icon: ReactNode;
  items?: {
    id?: string;
    icon: ReactNode;
    text: string;
    onClick?: () => void;
  }[];
};

const SidePanel = ({ label, icon, items }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const tooltip = useTooltip();

  const collapse = () => {
    setIsCollapsed(true);
  };

  const expand = () => {
    setIsCollapsed(false);
  };

  const handleClick = () => {
    if (isCollapsed) expand();
    else collapse();
  };

  return (
    <>
      <div
        className={`flex flex-col shrink-0 items-center bg-background-100
          dark:bg-background-dark-300 p-7 rounded-4xl transition-all duration-250
          cursor-pointer box-content ${isCollapsed ? "w-6" : "w-1/6"}`}
        onClick={handleClick}
      >
        <div
          className={`flex items-center justify-center pb-3 mb-4 border-b border-border-200
            dark:border-border-100 w-full ${isCollapsed ? "gap-0" : "gap-1.5"} `}
        >
          <div
            className="w-7 shrink-0 text-secondary-100"
            onMouseEnter={() => {
              if (isCollapsed) {
                tooltip.changeText(label);
                tooltip.showTooltip();
              }
            }}
            onMouseLeave={() => tooltip.hideTooltip()}
          >
            {icon}
          </div>
          <div
            className={`select-none text-lg text-primary-100 dark:text-primary-dark-100
              ${isCollapsed ? "w-0 invisible" : "w-auto visible"}`}
          >
            {label}
          </div>
        </div>
        <div
          className="flex flex-col items-center gap-4 w-full no-scrollbar overflow-y-auto
            overflow-x-hidden"
          ref={containerRef}
        >
          {items?.map((item) => (
            <button
              key={item.id || item.text + random()}
              onClick={(event) => {
                if (item.onClick) {
                  event.stopPropagation();
                  item.onClick();
                }
              }}
              onMouseEnter={() => {
                if (isCollapsed) {
                  tooltip.changeText(item.text);
                  tooltip.showTooltip();
                }
              }}
              onMouseLeave={() => tooltip.hideTooltip()}
              className={`group flex items-center w-full gap-1.5 bg-background-200
              dark:bg-background-dark-200 rounded cursor-pointer hover:bg-background-300
              dark:hover:bg-background-dark-100 group-hover:bg-background-300
              dark:group-hover:bg-background-dark-100 transition-colors duration-80`}
            >
              <div
                className="w-6 shrink-0 text-secondary-100 opacity-70 hover:opacity-100
                  group-hover:opacity-100 transition-opacity duration-80"
              >
                {item.icon}
              </div>

              {!isCollapsed && (
                <div className="text-sm text-primary-200 dark:text-primary-dark-200 truncate w-full pr-1.5">
                  {item.text}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SidePanel;
