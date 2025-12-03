import {
  LayoutDashboard,
  FileText,
  Upload,
  Settings,
  HelpCircle,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", url: "/" },
    { icon: FileText, label: "Judgments", url: "/judgments" },
    { icon: Upload, label: "Upload", url: "/upload" },
  ];

  const generalItems = [
    { icon: Settings, label: "Settings", url: "/settings" },
    { icon: HelpCircle, label: "Help", url: "/help" },
  ];

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors cursor-pointer ${
      isActive
        ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
        : "text-sidebar-foreground hover:bg-sidebar-primary/70 hover:text-sidebar-primary-foreground"
    }`;

  const handleClick = () => {
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity bg-black/50 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      <aside
        className={`bg-sidebar border-r border-border shrink-0 w-64 flex flex-col transform transition-transform
          md:relative md:translate-x-0 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed top-0 left-0 h-full z-50 md:h-auto md:z-auto md:flex`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 md:hidden">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 pt-0 md:pt-4">
          <p className="text-xs font-semibold text-sidebar-foreground/60 px-4 py-2 uppercase">
            Menu
          </p>
          {menuItems.map(({ icon: Icon, label, url }) => (
            <NavLink
              to={url}
              key={url}
              className={linkClasses}
              end={url === "/"}
              onClick={handleClick}
            >
              <Icon className="w-4 h-4" />
              <span className="flex-1 text-left">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-4 space-y-1">
          <p className="text-xs font-semibold text-sidebar-foreground/60 px-4 py-2 uppercase">
            General
          </p>
          {generalItems.map(({ icon: Icon, label, url }) => (
            <NavLink
              to={url}
              key={url}
              className={linkClasses}
              onClick={handleClick}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
}
