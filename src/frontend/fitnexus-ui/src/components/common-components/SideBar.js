import {
    BicepsFlexed,
    BrickWall,
    Drumstick,
    Dumbbell,
    Home,
    LineChart,
	Link2,
	Link2Icon,
	Link2Off,
	Settings,
    ShoppingCart,
    Users2
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components_ui/ui/tooltip';
import {PLAN_NUTRI, ENTRENAMIENTOS} from "../utils/env";
import {FITNEXUS_URL} from "../utils/client";

const SideBar = ({ isAdmin }) => {

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

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link to={FITNEXUS_URL + "/dashboard"} className="flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
								<Home className="h-5 w-5" />
								<span className="sr-only">Dashboard</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Dashboard</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link to={FITNEXUS_URL + "/ejercicios"} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
								<BicepsFlexed className="h-5 w-5" />
								<span className="sr-only">{ENTRENAMIENTOS}</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">{ENTRENAMIENTOS}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
                <TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link to={FITNEXUS_URL + "/nutri"} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
								<Drumstick className="h-5 w-5" />
								<span className="sr-only">{PLAN_NUTRI}</span>
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
									className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
								>
									<Users2 className="h-5 w-5" />
									<span className="sr-only">Clientes</span>
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
								<Link to={FITNEXUS_URL + "/create-exercise"}
									className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
								>
									<BrickWall className="h-5 w-5" />
									<span className="sr-only">Workout Builder</span>
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
							<Link to={FITNEXUS_URL + "/settings"} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
								<Settings className="h-5 w-5" />
								<span className="sr-only">Ajustes</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Ajustes</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				{/*Elementos SideBar de prueba*/}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link to={FITNEXUS_URL + "/test1"} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
								<Link2Off className="h-5 w-5" />
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Test1</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link to={FITNEXUS_URL + "/test2"} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
								< Link2 className="h-5 w-5" />
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Test2</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</nav>
		</aside>
	);
};

export default SideBar;
