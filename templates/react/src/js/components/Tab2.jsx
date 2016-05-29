import React from 'react';

class Tab2 extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="tab2">
                {this.props.params.cont}
            </div>
        );
    }
}

export default Tab2;
