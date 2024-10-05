import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from '../components_ui/ui/navigation-menu'

class NavigationMenuAdmin extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
}
  render () {
    return (
      <NavigationMenu>
      <NavigationMenuList>
          <Link to="http://localhost:3000/dashboard-admin" className="text-muted-foreground transition-colors hover:text-foreground">
            FIT NEXUS
          </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>CLIENTES</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Link to="http://localhost:3000/tbd">Ver clientes</Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>ENTRENAMIENTOS</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Link to="http://localhost:3000/tbd">Planes de entrenamiento tbd</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Link to="http://localhost:3000/tbd">Rutinas tbd</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Link to="http://localhost:3000/ejercicios">Ver ejercicios</Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>DIETA</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Link to="http://localhost:3000/tbd">Crear dieta</Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>WORKOUT BUILDER</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Link to="http://localhost:3000/tbd">Planes de entrenamiento tbd</Link>
            </NavigationMenuLink>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Link to="http://localhost:3000/tbd">Rutinas tbd</Link>
            </NavigationMenuLink>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Link to="http://localhost:3000/create-exercise">Crear ejercicios</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Avatar + Ajustes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Link to="http://localhost:3000/edit-profile">Editar perfil</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
        
        <Link to="/form" className="text-muted-foreground transition-colors hover:text-foreground">
            /form
        </Link>

      </NavigationMenuList>
    </NavigationMenu>
    )
  }
}

export default NavigationMenuAdmin
