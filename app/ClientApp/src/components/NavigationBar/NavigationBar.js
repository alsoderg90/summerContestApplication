import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const NavigationBar = () => {
  return (
    <Navbar
      bg='dark'
      expand='lg'
      variant='dark'
      style={{ marginBottom: '2em' }}
    >
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Summer Contest</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/dashboard'>
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
				  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
				  <NavDropdown.Item href="#action/3.2">
					Another action
				  </NavDropdown.Item>
				  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
				  <NavDropdown.Divider />
				  <NavDropdown.Item href="#action/3.4">
					Separated link
				  </NavDropdown.Item>
				</NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
