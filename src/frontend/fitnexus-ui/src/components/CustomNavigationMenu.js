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

          <Link to="http://localhost:3000/" className="text-muted-foreground transition-colors hover:text-foreground">
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

        <h2>endpoints: </h2>
        <Link to="http://localhost:3000/login" className="text-muted-foreground transition-colors hover:text-foreground">
           /login
        </Link>
        <Link to="http://localhost:3000/signup" className="text-muted-foreground transition-colors hover:text-foreground">
            /signup
          </Link>
          <Link to="http://localhost:3000/dashboard" className="text-muted-foreground transition-colors hover:text-foreground">
            /dashboard
          </Link>
          <Link to="http://localhost:3000/edit-profile" className="text-muted-foreground transition-colors hover:text-foreground">
          /edit-profile
          </Link>
          <Link to="http://localhost:3000/table" className="text-muted-foreground transition-colors hover:text-foreground">
          /table
          </Link>
          <Link to="http://localhost:3000/form" className="text-muted-foreground transition-colors hover:text-foreground">
          /form
          </Link>



      </NavigationMenuList>
    </NavigationMenu>
    )
  }
}

export default CustomNavigationMenu
