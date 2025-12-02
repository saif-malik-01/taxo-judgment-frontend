import {
  LayoutDashboard,
  FileText,
  Upload,
  Settings,
  HelpCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", url: "/" },
    { icon: FileText, label: "Cases", url: "/cases" },
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

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col h-full">
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <p className="text-xs font-semibold text-sidebar-foreground/60 px-4 py-2 uppercase">
          Menu
        </p>
        {menuItems.map(({ icon: Icon, label, url }) => (
          <NavLink to={url} key={url} className={linkClasses} end={url === "/"}>
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
          <NavLink to={url} key={url} className={linkClasses}>
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
