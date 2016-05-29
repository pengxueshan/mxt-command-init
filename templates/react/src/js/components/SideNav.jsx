import React from 'react';
import { Link, IndexLink } from 'react-router';

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        const NAV_ITEM = [{
            to: '/',
            className: 'side-nav-link my',
            text: '自选'
        },{
            to: '/quotion',
            className: 'side-nav-link quotion',
            text: '行情'
        },{
            to: '/trade',
            className: 'side-nav-link trade',
            text: '交易'
        }];
        this.state = {
            navItemText: NAV_ITEM,
            curSideNav: this.props.curSideNav
        };
    }
    
    getNavLinks() {
        return this.state.navItemText.map(function(item, index) {
            // let isActive = index === this.state.curSideNav;
            // let cur = '';
            // if(isActive) {
            //     cur = ' cur';
            // }
            // let className = item.className + cur;
            let ret;
            if(index === 0) {
                ret = (
                    <li key={index}><IndexLink data-index={index} to={item.to} activeClassName="cur" className={item.className} onClick={this.onNavLinkClick.bind(this)}>{item.text}</IndexLink></li>
                );
            } else {
                ret = (
                    <li key={index}><Link data-index={index} to={item.to} activeClassName="cur" className={item.className} onClick={this.onNavLinkClick.bind(this)}>{item.text}</Link></li>
                );
            }
            return ret;
        }.bind(this));
    }
    
    onNavLinkClick(e) {
        e.stopPropagation();
        this.setState({
            curSideNav: parseInt(e.target.getAttribute('data-index'))
        });
    }
    
    test() {
        alert('t');
    }
    
    render() {
        let navLinks = this.getNavLinks();
        
        return (
            <div className="side-nav">
                <ul>
                    {navLinks}
                </ul>
                <div onClick={this.test}>
                    <svg>
                        <use xlinkHref="#visible"></use>
                    </svg>
                </div>
            </div>
        );
    }
}

export default SideNav;
