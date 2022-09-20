import { Nav, Navbar } from "react-bootstrap";
import { NAVIGATION_LINKS } from "../../globals/constants/constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faC, faHome, faMessage, faUser, faBookmark, faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <Navbar expand='lg' className='flex-column align-items-start'>
            <div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Brand as={Link} to={NAVIGATION_LINKS.HOME} className='text-primary'>
                    <FontAwesomeIcon icon={faC} size='lg' className='shadow-lg rounded-circle p-1' /> &nbsp;
                    Cofeed
                </Navbar.Brand>
            </div>

            <Navbar.Collapse>
                <Nav defaultActiveKey={NAVIGATION_LINKS.HOME} className="flex-column">

                    <h6 className='mt-3'>
                        Menu
                    </h6>

                    <Nav.Link as={Link} to={NAVIGATION_LINKS.HOME} href={NAVIGATION_LINKS.HOME} className='py-3'>
                        <FontAwesomeIcon icon={faHome} size='lg' /> &nbsp;
                        Home
                    </Nav.Link>

                    <Nav.Link as={Link} href={NAVIGATION_LINKS.MESSAGES} to={NAVIGATION_LINKS.MESSAGES} className='py-3'>
                        <FontAwesomeIcon icon={faMessage} size='lg' /> &nbsp;
                        Messages
                    </Nav.Link>

                    <Nav.Link as={Link} href={NAVIGATION_LINKS.PROFILE} to={NAVIGATION_LINKS.PROFILE} className='py-3'>
                        <FontAwesomeIcon icon={faUser} size='lg' /> &nbsp;
                        Profile
                    </Nav.Link>

                    <Nav.Link as={Link} href={NAVIGATION_LINKS.SAVED_POSTS} to={NAVIGATION_LINKS.SAVED_POSTS} className='py-3'>
                        <FontAwesomeIcon icon={faBookmark} size='lg' /> &nbsp;
                        Saved Posts
                    </Nav.Link>

                    <Nav.Link as={Link} href={NAVIGATION_LINKS.SETTINGS} to={NAVIGATION_LINKS.SETTINGS} className='py-3'>
                        <FontAwesomeIcon icon={faCog} size='lg' /> &nbsp;
                        Settings
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}