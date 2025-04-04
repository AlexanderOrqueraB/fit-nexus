import {
    BicepsFlexed,
    Hammer,
    CircleUserRound,
    Drumstick,
    Home,
    LineChart,
    PanelLeft,
	Users2
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components_ui/ui/button';
import React, { useContext } from "react";
import { PLAN_NUTRI, ENTRENAMIENTOS, PAGINA_PRINCIPAL } from "../../utils/env";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../../components_ui/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '../../components_ui/ui/sheet';
import {FITNEXUS_URL} from "../../utils/client";
import { UserContext } from "../global/UserContext";
import { ThemeToggle } from '../common/ThemeToggle';

const Header = ({ isAdmin }) => {

    const navigate = useNavigate();

	const { setUser } = useContext(UserContext); // Use UserContext to get setUser
	
	  const handleLogout = () => {
	
		console.log ("userRole antes del logout: ", localStorage.getItem("userRole"));
		console.log ("userEmail antes del logout: ", localStorage.getItem("userEmail"));
		console.log ("fitNexusId antes del logout: ", localStorage.getItem("fitNexusId"));
		//Eliminamos el rol, email y fitNexusId del contexto setUser({ role, email, fitNexusId });
		setUser(null);
	
		//Borramos el rol, fitNexusId y email en local storage
		localStorage.removeItem("userRole");
		localStorage.removeItem("userEmail");
		localStorage.removeItem("fitNexusId");
	
		console.log ("userRole después del logout: ", localStorage.getItem("userRole"));
		console.log ("userEmail después del logout: ", localStorage.getItem("userEmail"));
		console.log ("fitNexusId después del logout: ", localStorage.getItem("fitNexusId"));
	
		navigate('/');
	  };

	const location = useLocation(); // Get the current location
	
	const isActive = (path) => location.pathname === path; // Function to check active link

	return ( 
		<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button size="icon" variant="outline" className="sm:hidden">
								<PanelLeft className="h-5 w-5" />
								<span className="sr-only">Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="sm:max-w-xs">
							<nav className="grid gap-6 text-lg font-medium">
								<Link to={FITNEXUS_URL + "/dashboard"}
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<Home className={`h-5 w-5 ${isActive("/dashboard") ? 'text-bold' : ''}`} />
									{PAGINA_PRINCIPAL}
								</Link>
								<Link to={FITNEXUS_URL + "/ejercicios"}
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<BicepsFlexed className="h-5 w-5" />
									{ENTRENAMIENTOS}
								</Link>
								<Link to={FITNEXUS_URL + "/nutri"} className="flex items-center gap-4 px-2.5 text-foreground">
									<Drumstick className="h-5 w-5" />
									{PLAN_NUTRI}
								</Link>
                                {isAdmin ? (
                                    <Link to={FITNEXUS_URL + "/clients"}
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<Users2 className="h-5 w-5" />
									Clientes
								</Link>
                                ): (null)}

                                {isAdmin ? (
                                    <Link to={FITNEXUS_URL + "/workout-builder"}
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<Hammer className="h-5 w-5" />
									Workout builder
								</Link>
                                ): (null)}
								
								<Link to={FITNEXUS_URL + "/settings"}
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<LineChart className="h-5 w-5" />
									Ajustes
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
				
					<div className="flex items-center gap-4 ml-auto">
	<ThemeToggle />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon" className="overflow-hidden rounded-full">
								<CircleUserRound className = "h-6 w-6"
								color='gray'
								/>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick= {()=>navigate('/settings')}>
                                Ajustes
                            </DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleLogout} type="submit">
                                    Cerrar sesión
                            </DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
          </div>
				</header>
    ); 
};

export default Header;