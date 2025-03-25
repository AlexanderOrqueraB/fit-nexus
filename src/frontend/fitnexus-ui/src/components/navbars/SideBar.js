import {
  BicepsFlexed,
  Hammer,
  Drumstick,
  Home,
  Settings,
  Users2,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components_ui/ui/tooltip";
import { PLAN_NUTRI, ENTRENAMIENTOS, PAGINA_PRINCIPAL } from "../../utils/env";
import { FITNEXUS_URL } from "../../utils/client";

const SideBar = ({ isAdmin }) => {
  const location = useLocation(); // Get the current location

  const isActive = (path) => location.pathname === path; // Function to check active link

  return (
    <aside className="w-16 flex-col border-r bg-background hidden sm:flex justify-center">
      <nav className="flex flex-col items-center gap-6 px-2 sm:py-5 ">
        {/*Iconos de Sidebar*/}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={FITNEXUS_URL + "/dashboard"}
                className={`group flex h-9 w-9 items-center justify-center rounded-lg 
								${
                  isActive("/dashboard")
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }
							} md:h-8 md:w-8`}
              >
                <Home
                  className={`h-5 w-5 ${
                    isActive("/dashboard") ? "text-bold" : ""
                  }`}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{PAGINA_PRINCIPAL}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={FITNEXUS_URL + "/ejercicios"}
                className={`group flex h-9 w-9 items-center justify-center rounded-lg 
								${
                  isActive("/ejercicios")
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }
							} md:h-8 md:w-8`}
              >
                <BicepsFlexed
                  className={`h-5 w-5 ${
                    isActive("/ejercicios") ? "text-bold" : ""
                  }`}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{ENTRENAMIENTOS}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={FITNEXUS_URL + "/nutri"}
                className={`group flex h-9 w-9 items-center justify-center rounded-lg 
								${
                  isActive("/nutri")
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }
							} md:h-8 md:w-8`}
              >
                <Drumstick
                  className={`h-5 w-5 ${isActive("/nutri") ? "text-bold" : ""}`}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{PLAN_NUTRI}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {isAdmin ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={FITNEXUS_URL + "/clients"}
                  className={`group flex h-9 w-9 items-center justify-center rounded-lg 
										${
                      isActive("/clients")
                        ? "bg-primary text-primary-foreground font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }
									} md:h-8 md:w-8`}
                >
                  <Users2
                    className={`h-5 w-5 ${
                      isActive("/clients") ? "text-bold" : ""
                    }`}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Clientes</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}

        {isAdmin ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={FITNEXUS_URL + "/workout-builder"}
                  className={`group flex h-9 w-9 items-center justify-center rounded-lg 
											${
                        isActive("/workout-builder")
                          ? "bg-primary text-primary-foreground font-bold"
                          : "text-muted-foreground hover:text-foreground"
                      }
										} md:h-8 md:w-8`}
                >
                  <Hammer
                    className={`h-5 w-5 ${
                      isActive("/workout-builder") ? "text-bold" : ""
                    }`}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Workout Builder</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={FITNEXUS_URL + "/settings"}
                className={`group flex h-9 w-9 items-center justify-center rounded-lg 
								${
                  isActive("/settings")
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }
							} md:h-8 md:w-8`}
              >
                <Settings
                  className={`h-5 w-5 ${
                    isActive("/settings") ? "text-bold" : ""
                  }`}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Ajustes</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default SideBar;
