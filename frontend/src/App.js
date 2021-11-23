import './App.css';
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from './router/appRouter';
import { AppNavbar  } from './components/appNavbar';
import {getUser} from "./store/selectors";
import {shallowEqual, useDispatch,useSelector} from "react-redux";
import {useEffect} from "react";
import {appLoading} from "./store/action";
import {Container, Spinner} from "react-bootstrap";

function App() {
    const user = useSelector (getUser,shallowEqual);
    const dispatch=useDispatch();
    useEffect(()=> {
        dispatch(appLoading());
    },[dispatch]);
    return  user.loading
        ?
              <Container style={{height:window.innerWidth}} className="d-flex justify-content-center align-items-center">
                  <Spinner animation={"border"} variant={"secondary"} />
              </Container>
        :
              <BrowserRouter>
                  <AppNavbar />
                  <AppRouter />
              </BrowserRouter>

}

export default App;
