import React from 'react';
import {Link,IndexLink} from 'react-router';

class TabPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curTab: this.props.curTab
        }
    }
    
    getTabHtml() {
        let nodes = this.props.tabs.map(this.getTabItemHtml.bind(this));
        return (
            <div>
                {nodes}
            </div>
        );
    }
    
    getTabItemHtml(tab, index) {
        // let isActive = index === this.state.curTab;
        // let cur;
        // if(isActive) {
        //     cur = 'cur';
        // }
        return (
            <Link key={index} data-index={index} to={tab.to} activeClassName="cur" onClick={this.onTabClick.bind(this)}>{tab.text}</Link>
        );
    }
    
    onTabClick(e) {
        this.setState({
            curTab: parseInt(e.target.getAttribute('data-index'))
        });
    }
    
    render() {
        let tabHtml = this.getTabHtml();
        return (
            <div className="tab-panel">
                {tabHtml}
            </div>
        );
    }
}

export default TabPanel;