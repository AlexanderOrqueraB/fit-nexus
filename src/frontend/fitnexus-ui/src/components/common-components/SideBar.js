import {
    BicepsFlexed,
    BrickWall,
    Drumstick,
    Dumbbell,
    Home,
    LineChart,
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
		<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
			<nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
				<Link to={FITNEXUS_URL + "/tbd"}
					className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
				>
					<Dumbbell className="h-4 w-4 transition-all group-hover:scale-110" />
					<span className="sr-only">Fit Nexus</span>
				</Link>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link to={FITNEXUS_URL + "/tbd"}
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Home className="h-5 w-5" />
								<span className="sr-only">Dashboard TBD</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Dashboard TBD</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link to={FITNEXUS_URL + "/tbd"}
								className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<ShoppingCart className="h-5 w-5" />
								<span className="sr-only">Orders</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Orders</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link to={FITNEXUS_URL + "/ejercicios"}
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
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
							<Link to={FITNEXUS_URL + "/tbd"}
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
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
							<Link to={FITNEXUS_URL + "/edit-profile"}
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<LineChart className="h-5 w-5" />
								<span className="sr-only">Ajustes</span>
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
