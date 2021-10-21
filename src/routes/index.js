import { Switch } from 'react-router-dom'
import Route from './Route'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" isPrivate component={Dashboard} />
        </Switch>
    )
}

export default Routes