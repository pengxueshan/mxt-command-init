import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { createBrowserHistory, useBasename } from 'history';
import App from './components/App';
import My from './components/My';
import Quotion from './components/Quotion';
import Trade from './components/Trade';
import Tab1 from './components/Tab1';
import Tab2 from './components/Tab2';

require('../css/test.scss');

// const historyConfig = useBasename(createBrowserHistory)({
//   basename: '/'        // 根目录名
// });

render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route component={My}>
          <IndexRoute myContent="my-tab1" component={Tab1} />
          <Route path="tab2" component={Tab2} />
        </Route>
        <Route path="quotion" component={Quotion}>
          <Route path="tab1" component={Tab1} />
          <Route path="tab2" component={Tab2} />
        </Route>
        <Route path="trade" component={Trade} />
      </Route>
    </Router>
  ), document.getElementById('wrap')
);
