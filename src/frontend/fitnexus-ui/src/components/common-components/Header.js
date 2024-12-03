import {
    BicepsFlexed,
    BrickWall,
    CircleUserRound,
    Drumstick,
    Dumbbell,
    Home,
    LineChart,
    PanelLeft,
	Users2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '../../components_ui/ui/breadcrumb';
import { Button } from '../../components_ui/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../../components_ui/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '../../components_ui/ui/sheet';
import {FITNEXUS_URL} from "../utils/client";
import BreadTest from "../common-components/BreadTest"
import { Fragment } from "react";

const Header = ({ isAdmin }) => {

	const pathname = window.location.pathname;

    const generateBreadcrumbs = () => {
        const pathArray = pathname.split('/').filter((path) => path);
        const breadcrumbs = pathArray.map((path, index) => {
            const href = '/' + pathArray.slice(0, index + 1).join('/');
            return { href, label: path };
        });
        return breadcrumbs;
    };

	const breadcrumbs = generateBreadcrumbs();

    const navigate = useNavigate();
	const location = window.location.port;

	const links = [
		{
			name:"hola",
			link:"/HOLA"
    	},
		{
			name:"adios",
			link:"/ADIOS"
    	},

	]

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
								<Link to={FITNEXUS_URL + "/tbd"}
									className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
								>
									<Dumbbell className="h-5 w-5 transition-all group-hover:scale-110" />
									<span className="sr-only">Fit Nexus</span>
								</Link>
								<Link to={FITNEXUS_URL + "/tbd"}
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<Home className="h-5 w-5" />
									Dashboard TBD
								</Link>
								<Link to={FITNEXUS_URL + "/ejercicios"}
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<BicepsFlexed className="h-5 w-5" />
									Entrenamientos
								</Link>
								<Link to={FITNEXUS_URL + "/tbd"} className="flex items-center gap-4 px-2.5 text-foreground">
									<Drumstick className="h-5 w-5" />
									Plan nutricional
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
                                    <Link to={FITNEXUS_URL + "/create-exercise"}
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<BrickWall className="h-5 w-5" />
									Workout builder
								</Link>
                                ): (null)}
								
								<Link to={FITNEXUS_URL + "/edit-profile"}
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<LineChart className="h-5 w-5" />
									Ajustes
								</Link>
							</nav>
						</SheetContent>
					</Sheet>


					<Breadcrumb className="hidden md:flex">
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href="change">{location}</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href="change">{location}</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>{location}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>

					{/* test breadcrumb*/}
					<Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((breadcrumb, index) => (
                            <Fragment key={index}>
                                {index !== 0 && <BreadcrumbSeparator />}
                                {index < breadcrumbs.length - 1 ? (
                                    <BreadcrumbItem>
                                        <Link href={breadcrumb.href}>
                                            {breadcrumb.label.charAt(0).toUpperCase() + breadcrumb.label.slice(1)}
                                        </Link>
                                    </BreadcrumbItem>
                                ) : (
                                    <BreadcrumbItem>
                                        <BreadcrumbLink>
                                            {breadcrumb.label.charAt(0).toUpperCase() + breadcrumb.label.slice(1)}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                )}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>

			    {/*Test 2*/}
				<BreadTest title="FIT NEXUS" page="BreadTest" links={links}/>
				

					<div className="relative ml-auto flex-1 md:grow-0">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon" className="overflow-hidden rounded-full">
								<CircleUserRound className = "h-6 w-6"
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
							<DropdownMenuItem onClick= {()=>navigate('/logout')}>
                                    Cerrar sesión
                            </DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
          </div>
				</header>
    ); 
};

export default Header;