import React from 'react';

class Tab1 extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="tab1">
                {this.props.myContent}
            </div>
        );
    }
}

export default Tab1;
