import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-light">
                    <div><h1>FIT NEXUS Header</h1></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent