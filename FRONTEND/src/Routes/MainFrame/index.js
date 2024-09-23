import React, { Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from 'react-router-dom';

import TopNav from '../../Components/TopNav';
import Home from '../Home';

// import { Instances } from '../../api';

import { ROUTES } from '../../Routes.constants';

import style from './style.module.scss';

class MainFrame extends Component {
    componentDidUpdate(prevProps, prevState) {
        // const { pathname } = this.props.location;
        /* to call all pending api call */
        // if (prevProps.location.pathname !== pathname) {
        //     Instances.map(instance => instance.cancelPending && instance.cancelPending());
        // }
    }

    render() {
        return (
            <Fragment>
                <TopNav />
                <div className={style.container}>
                    <Switch>
                        <Route path={ROUTES.HOME} component={Home} />
                        <Redirect from={ROUTES.INDEX} to={ROUTES.HOME} />
                    </Switch>
                </div>
            </Fragment>
        );
    }
}
export default MainFrame;
