import React, { useEffect } from "react";

// routing
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// styles
import './App.scss';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

// common components and pages
import Navigation from "./components/navigation/navigation";
import Search from "./components/search/search";

// bootstrap elements
import { Container, Row, Col } from "react-bootstrap";

// pages
import Home from './pages/home/home';

// constants
import { NAVIGATION_LINKS } from "./globals/constants/constants";

// redux
import { useDispatch } from 'react-redux';
import { set } from './globals/auth/current-user-reducer';

// fetches current user's data
import CurrentUserModel from "./globals/auth/current-user-model";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // fetch the current user's data, and dispatch it
    const currentUserModel = new CurrentUserModel();
    currentUserModel.currentUser.subscribe(newValue => dispatch(set(newValue?.toJson())));
    currentUserModel.fetchCurrentUser();
  }, [dispatch]);

  return (

    <Router>
      <Container fluid className='py-2'>
        <Row>
          {/** App's side navigation bar */}
          <Col className='bg-light'>
            <Navigation />
          </Col>

          {/** current page */}
          <Col lg={7} className='order-3 order-lg-2'>
            <Routes>
              <Route path={NAVIGATION_LINKS.HOME} element={<Home />} />

              <Route path={NAVIGATION_LINKS.MESSAGES} element={<Home />} />

              <Route path={NAVIGATION_LINKS.PROFILE} element={<Home />} />

              <Route path={NAVIGATION_LINKS.SAVED_POSTS} element={<Home />} />

              <Route path={NAVIGATION_LINKS.SETTINGS} element={<Home />} />
            </Routes>
          </Col>

          {/** search section on the right side */}
          <Col className='order-2 order-lg-3 my-2 my-md-0'>
            <Search />
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
