import { useLocation } from "react-router-dom";
import { ROUTE_NAME_MAP } from "../config/routes";

interface BreadcrumbSection {
  name: string;
  path: string;
}

export const useBreadcrumbs = (): BreadcrumbSection[] => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter((x) => x);

  const breadcrumbs: BreadcrumbSection[] = [
    { name: ROUTE_NAME_MAP[""] || "Inicio", path: "/" },
  ];

  let accumulatedPath = "";

  pathSegments.forEach((segment, index) => {
    accumulatedPath += `/${segment}`;

    let name = ROUTE_NAME_MAP[segment];

    if (!name) {
      const isEditPath = index > 0 && pathSegments[index - 1] === "users";

      if (isEditPath) {
        name = "Editar";
      } else {
        name =
          segment.length > 8 ? `ID: ${segment.substring(0, 8)}...` : segment;
      }
    }

    breadcrumbs.push({
      name: name,
      path: accumulatedPath,
    });
  });

  return breadcrumbs;
};
