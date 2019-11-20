import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Grupo from './components/Grupo';
import Chat from './components/Chat';

const Routes = () => (
    <Router>
        <Route path="/" exact component={Grupo}></Route>
        <Route path="/chat" component={Chat}></Route>
    </Router>
)

export default Routes;