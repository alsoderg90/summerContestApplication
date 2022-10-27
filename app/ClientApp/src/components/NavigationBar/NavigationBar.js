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
            <NavDropdown title='Dashboard' id='basic-nav-dropdown'>
              <NavDropdown.Item as='div'>
                <LinkContainer to='/dashboard/members'>
                  <Nav.Link> Members</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item as='div'>
                <LinkContainer to='/dashboard/teams'>
                  <Nav.Link> Teams</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as='div'>
                <LinkContainer to='/dashboard/settings'>
                  <Nav.Link> Settings</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
