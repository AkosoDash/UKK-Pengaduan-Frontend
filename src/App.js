import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Index from './pages/Index.jsx'
import {
  Login,
  Register,
  Report,
  Admin,
  Admindex,
  ReportIndex,
  ReportIndexAdmin,
  ReportHistory,
  ReportDone
} from './pages/'
function App() {
  return (<BrowserRouter>
    <Switch>
      <Route component={ReportHistory} path="/history"/>
      <Route component={ReportIndexAdmin} path="/reportindexadmin"/>
      <Route component={ReportDone} path="/done"/>
      <Route component={ReportIndex} path="/reportindex"/>
      <Route component={Admindex} path="/adminindex"/>
      <Route component={Admin} path="/admin"/>
      <Route component={Report} path="/report"/>
      <Route component={Register} path="/register"/>
      <Route component={Login} path="/login"/>
      <Route component={Index} path="/"/>
    </Switch>
  </ BrowserRouter>);
}

export default App;