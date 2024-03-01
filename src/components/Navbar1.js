import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavbarCss.css';

function Navbar1() {
    return (
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container style={{backgroundColor:"#7df4ff", padding:"2em", fontSize:"1.2em"}}>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

      <Nav defaultActiveKey="/home">
      
     
            <Nav.Link href="/competitions">Competitions</Nav.Link>
            

            <Nav.Link href="/nationalTeams">Teams</Nav.Link>
            <Nav.Link href="/nations">Nations</Nav.Link>
            <Nav.Link href="/people">People</Nav.Link>
            <Nav.Link href="/roles">Roles</Nav.Link>
            <Nav.Link href="/routines">Routines</Nav.Link>

            <NavDropdown title="Media" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/articles">Articles</NavDropdown.Item>
              <NavDropdown.Item href="/broadcasts">
                Broadcasts
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Music" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/soundtracks">Soundtracks</NavDropdown.Item>
              <NavDropdown.Item href="/musics">
                Musics
              </NavDropdown.Item>
              <NavDropdown.Item href="/artists">
                Artists
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/tags">Tags</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
       
      </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  }
  
  export default Navbar1;