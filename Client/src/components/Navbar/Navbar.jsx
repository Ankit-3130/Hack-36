import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../pages/login/styles.css";

function NavMenu(prop) {
  return (
    <Navbar expand="lg" className="bg-gray-800 text-white rounded-3xl">
      <Container>
        <Navbar.Brand className=" hover:underline text-white">
          Welcome {prop.User}!
        </Navbar.Brand>
        <Navbar.Brand className="hover:underline text-white">
          Aadhar Number - {prop.Aadhar}
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
            <NavDropdown
              title="More"
              id="basic-nav-dropdown"
              className="hover:scale-110 text-white bg-white rounded-2xl"
            >
              <NavDropdown.Item
                href="#action/3.1"
                className=" hover:bg-red-500"
              >
                Logout
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
}
function NavMenu2(prop) {
  return (
    <Navbar expand="lg" className="bg-gray-800 text-white rounded-3xl ">
      <Container>
        <Navbar.Brand className=" hover:underline text-white  ">
          Welcome {prop.User}!
        </Navbar.Brand>

        <Navbar id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title="More"
              id="basic-nav-dropdown"
              className="ml-80 hover:scale-110 text-white bg-white rounded-2xl"
            >
              <NavDropdown.Item
                href="#action/3.1"
                className=" hover:bg-red-500"
              >
                Logout
              </NavDropdown.Item>

              {/* <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
}

export { NavMenu, NavMenu2 };
