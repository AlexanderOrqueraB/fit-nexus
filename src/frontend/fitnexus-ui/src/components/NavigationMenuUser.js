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

class NavigationMenuUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
}
  render () {
    return (
      <NavigationMenu>
      <NavigationMenuList>

          <Link to="http://localhost:3000/dashboard" className="text-muted-foreground transition-colors hover:text-foreground">
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


      </NavigationMenuList>
    </NavigationMenu>
    )
  }
}

export default NavigationMenuUser
