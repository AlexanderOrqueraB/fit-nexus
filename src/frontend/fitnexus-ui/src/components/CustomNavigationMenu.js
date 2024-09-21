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
} from '../components_ui/ui/navigation-menu'

class CustomNavigationMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
}
  render () {
    return (
      <NavigationMenu>
      <NavigationMenuList>

          <Link to="http://localhost:8080/" className="text-muted-foreground transition-colors hover:text-foreground">
            FIT NEXUS
          </Link>

        <NavigationMenuItem>
          <NavigationMenuTrigger>LOGIN</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>
            <Link to="http://localhost:3000/login" className="underline">login posibles links</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>


        <NavigationMenuItem>
          <NavigationMenuTrigger>SIGN UP</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>
              <Link to="http://localhost:3000/signup" className="underline">sing up posibles links</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <h4>endpoints: </h4>
        <Link to="/login" className="text-muted-foreground transition-colors hover:text-foreground">
            /login
        </Link>
        <Link to="/signup" className="text-muted-foreground transition-colors hover:text-foreground">
            /signup
        </Link>
        <Link to="/edit-profile" className="text-muted-foreground transition-colors hover:text-foreground">
            /edit-profile
        </Link>
        <Link to="/create-exercise" className="text-muted-foreground transition-colors hover:text-foreground">
            /create-exercise
        </Link>
        <Link to="/ejercicios" className="text-muted-foreground transition-colors hover:text-foreground">
            /ejercicios
        </Link>
        <Link to="/form" className="text-muted-foreground transition-colors hover:text-foreground">
            /form
        </Link>



      </NavigationMenuList>
    </NavigationMenu>
    )
  }
}

export default CustomNavigationMenu
