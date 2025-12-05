import { Link } from "react-router";
import { useSelector } from "react-redux";
import casheaimg from "../assets/cashea.jpg";
import logo2 from "../assets/logo2.png";
import CambioMarquee from "../components/CambioMarquee";
import {
  LucideBaggageClaim,
  LucideBoxes,
  LucideCalculator,
  LucideCalendar,
  LucideChartNetwork,
  LucideClipboardCheck,
  LucideClockArrowDown,
  LucideExternalLink,
  LucideFilePlus,
  LucideFileInput,
  LucideFolderSearch,
  LucideLayoutDashboard,
  LucideListTodo,
  LucidePenTool,
  LucidePersonStanding,
  LucideStar,
  LucideTruck,
  LucideUsers,
} from "lucide-react";

// --- Data para las secciones del Dashboard ---

const salesSection = [
  { to: "/facturacion", icon: <LucideBaggageClaim />, label: "Venta Detal", isPrimary: true },
  { to: "/enconstruccion", icon: <LucideTruck />, label: "Venta Mayor" },
  { to: "/verpedidos", icon: <LucideListTodo />, label: "Lista de Ventas" },
  { to: "/verproductos", icon: <LucideBoxes />, label: "Productos" },
  { to: "/crearproducto", icon: <LucideFilePlus />, label: "Crear Producto" },

  { to: "/reporteclientes", icon: <LucideUsers />, label: "Clientes" },
];

const inventorySection = [
  { to: "/verproductos", icon: <LucideBoxes />, label: "Productos" },
  { to: "/crearproducto", icon: <LucideFilePlus />, label: "Crear Producto" },
  { to: "/listaproductos", icon: <LucideBoxes />, label: "Lista Inventario" },

  { to: "/reporteclientes", icon: <LucideUsers />, label: "Clientes" },
];

const reportsSection = [
  { to: "/enconstruccion", icon: <LucideLayoutDashboard />, label: "Dashboard" },
  { to: "/enconstruccion", icon: <LucideClipboardCheck />, label: "Cuadre de Caja" },
  { to: "/enconstruccion", icon: <LucideCalculator />, label: "Gastos" },
];

const toolsSection = [
  {
    to: "https://intranet-v2-9drcsb58h-tyrant7995gmailcoms-projects.vercel.app/",
    icon: <LucideChartNetwork />,
    label: "Intranet",
    isExternal: true,
  },
  {
    to: "https://planner-b4ey3we1w-tyrant7995gmailcoms-projects.vercel.app/",
    icon: <LucideCalendar />,
    label: "Planificación",
    isExternal: true,
  },
  {
    to: "https://horario-p9wma9x58-franklin-bolivars-projects.vercel.app/",
    icon: <LucideClockArrowDown />,
    label: "Horarios",
    isExternal: true,
  },
];

// --- Componentes Reutilizables ---

const DashboardCard = ({ to, icon, label, isPrimary, isExternal, children }) => {
  const cardClasses = `home-card ${isPrimary ? "primary" : ""}`;

  const content = (
    <>
      {icon}
      {children}
      <span>{label}</span>
      {isExternal && <LucideExternalLink className="external-link-icon" />}
    </>
  );

  if (isExternal) {
    return (
      <a href={to} rel="noopener noreferrer" target="_blank" className={cardClasses}>
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={cardClasses}>
      {content}
    </Link>
  );
};

const DashboardSection = ({ title, cards }) => (
  <section className="dashboard-section">
    <h2 className="section-title">{title}</h2>
    <div className="section-grid">
      {cards.map((card) => (
        <DashboardCard key={card.label} {...card} />
      ))}
    </div>
  </section>
);

function HomeScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (!userInfo) {
    return (
      <div className="not-userinfo">
        <img src={logo2} alt="fachada" />;
      </div>
    );
  }

  return (
    <>
      <CambioMarquee />
      <div className="dashboard-container">
        <DashboardSection title="Ventas e Inventarios" cards={salesSection} />
        <DashboardSection title="Herramientas Administrativas" cards={reportsSection} />
      </div>
    </>
  );
}

export default HomeScreen;
