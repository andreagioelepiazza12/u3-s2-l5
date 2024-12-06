import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Topbar.css'; 

const Topbar = () => {
  return (
    <div className="main-content">
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="navbar-custom shadow-sm"
        fixed="top"
      >
        <Container>
          <Navbar.Brand as={Link} to="#" className="navbar-brand-custom">
            HomePage
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/provincie" className="nav-link-custom">
                Maggiori Città
              </Nav.Link>
              <Nav.Link as={Link} to="/" className="nav-link-custom">
                Cerca
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Topbar;