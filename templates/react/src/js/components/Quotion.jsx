import React from 'react';
import TabPanel from './TabPanel';

class Quotion extends React.Component {
    constructor(props) {
        super(props);
        let tabs = [{
            to: '/quotion/tab1',
            text: 'qTab1'
        },{
            to: '/quotion/tab2',
            text: 'qTab2'
        }];
        this.state = {
            tabs: tabs,
            curTab: 0
        };
    }
    
    render() {
        return (
            <div className="quotion">
                <TabPanel curTab={this.state.curTab} tabs={this.state.tabs} />
                {this.props.children}
            </div>
        );
    }
}

export default Quotion;