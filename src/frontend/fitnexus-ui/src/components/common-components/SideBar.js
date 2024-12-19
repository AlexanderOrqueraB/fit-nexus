import {
	BarChart2Icon,
    BicepsFlexed,
    BrickWall,
    Drumstick,
    Dumbbell,
    Home,
	Link2,
	Link2Off,
	Settings,
    Users2
} from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components_ui/ui/tooltip';
import {PLAN_NUTRI, ENTRENAMIENTOS} from "../utils/env";
import {FITNEXUS_URL} from "../utils/client";

const SideBar = ({ isAdmin }) => {
    const location = useLocation(); // Get the current location

    const isActive = (path) => location.pathname === path; // Function to check active link

	return (
		<aside className="w-16 flex-col border-r bg-background hidden sm:flex">
			<nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
						<Link to={FITNEXUS_URL + "/dashboard"} className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
							<Dumbbell className="h-4 w-4 transition-all group-hover:scale-110" />
						</Link>
						</TooltipTrigger>
						<TooltipContent side="right">FIT NEXUS</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				{/*Iconos de Sidebar*/}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link to={FITNEXUS_URL + "/dashboard"} className={
								`group flex h-9 w-9 items-center justify-center rounded-lg 
								${isActive("/dashboard") ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}
							} md:h-8 md:w-8`}
							>
								<Home className={`h-5 w-5 ${isActive("/dashboard") ? 'text-bold' : ''}`} />
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Dashboard</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link to={FITNEXUS_URL + "/ejercicios"} className={
								`group flex h-9 w-9 items-center justify-center rounded-lg 
								${isActive("/ejercicios") ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}
							} md:h-8 md:w-8`}
							>
								<BicepsFlexed className={`h-5 w-5 ${isActive("/ejercicios") ? 'text-bold' : ''}`} />
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">{ENTRENAMIENTOS}</TooltipContent>
					</Tooltip>
				</TooltipProvider>

                <TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link to={FITNEXUS_URL + "/nutri"} className={
								`group flex h-9 w-9 items-center justify-center rounded-lg 
								${isActive("/nutri") ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}
							} md:h-8 md:w-8`}
							>
								<Drumstick className={`h-5 w-5 ${isActive("/nutri") ? 'text-bold' : ''}`} />
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">{PLAN_NUTRI}</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				{isAdmin ? (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link to={FITNEXUS_URL + "/clients"}
									className={
										`group flex h-9 w-9 items-center justify-center rounded-lg 
										${isActive("/clients") ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}
									} md:h-8 md:w-8`}
									>
										<Users2 className={`h-5 w-5 ${isActive("/clients") ? 'text-bold' : ''}`} />
									</Link>
								</TooltipTrigger>
								<TooltipContent side="right">Clientes</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : (null)
                }
				
                {isAdmin ? (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link to={FITNEXUS_URL + "/workout-builder"}
										className={
											`group flex h-9 w-9 items-center justify-center rounded-lg 
											${isActive("/workout-builder") ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}
										} md:h-8 md:w-8`}
									>
										<BrickWall className={`h-5 w-5 ${isActive("/workout-builder") ? 'text-bold' : ''}`} />
									</Link>
								</TooltipTrigger>
								<TooltipContent side="right">Workout Builder</TooltipContent>
							</Tooltip>
						</TooltipProvider>  
					) : (null)
                }

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link to={FITNEXUS_URL + "/settings"} className={
								`group flex h-9 w-9 items-center justify-center rounded-lg 
								${isActive("/settings") ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}
							} md:h-8 md:w-8`}
							>
								<Settings className={`h-5 w-5 ${isActive("/settings") ? 'text-bold' : ''}`} />
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
