import React from 'react';
import TabPanel from './TabPanel';

class My extends React.Component {
    constructor(props) {
        super(props);
        let tabs = [{
            to: '/',
            text: 'myTab1'
        },{
            to: '/tab2',
            text: 'myTab2'
        }];
        this.state = {
            tabs: tabs,
            curTab: 0
        };
    }
    
    render() {
        return (
            <div className="my">
                <TabPanel curTab={this.state.curTab} tabs={this.state.tabs} />
                {this.props.children}
            </div>
        );
    }
}

export default My;