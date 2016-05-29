import React from 'react';
import SideNav from '../components/SideNav';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curSideNav: 0
        };
    }
    
    render() {
        return (
            <div className="app">
                <SideNav curSideNav={this.state.curSideNav} />
                <div className="test"></div>
                {this.props.children}
            </div>
        );
    }
}

export default App;
