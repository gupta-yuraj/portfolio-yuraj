import {
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiBriefcase,
  FiZap,
  FiAward,
  FiBookOpen,
  FiBarChart2,
  FiPieChart,
  FiDollarSign,
  FiShoppingCart,
  FiClipboard,
  FiStar,
  FiCompass,
} from "react-icons/fi";
import {
  MdInventory2,
  MdOutlineAnalytics,
  MdOutlineHandshake,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { RiFileExcel2Fill } from "react-icons/ri";

/*
  Central icon registry shared by the public site and the admin CMS.
  Content stored in Supabase only ever references an icon by its string key
  (e.g. "target"), never a component — this keeps the table data plain,
  JSON-serializable, and safe to render in the generic <SectionEditor />.
  Add a new icon here and it's immediately selectable in the admin panel.
*/
export const ICON_MAP = {
  target: FiTarget,
  trending: FiTrendingUp,
  users: FiUsers,
  briefcase: FiBriefcase,
  zap: FiZap,
  award: FiAward,
  book: FiBookOpen,
  barChart: FiBarChart2,
  pieChart: FiPieChart,
  dollar: FiDollarSign,
  cart: FiShoppingCart,
  clipboard: FiClipboard,
  star: FiStar,
  compass: FiCompass,
  inventory: MdInventory2,
  analytics: MdOutlineAnalytics,
  handshake: MdOutlineHandshake,
  support: MdOutlineSupportAgent,
  graphUp: BsGraphUpArrow,
  excel: RiFileExcel2Fill,
};

export const ICON_KEYS = Object.keys(ICON_MAP);

/* Turns a stored icon key (string) into an actual component for rendering.
   Falls back to FiStar for unknown/blank keys so a bad value never crashes
   the page. If already given a component (static fallback data), passes
   it straight through. */
export function resolveIcon(icon) {
  if (typeof icon === "function") return icon;
  return ICON_MAP[icon] || FiStar;
}
