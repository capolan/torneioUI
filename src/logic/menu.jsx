import { Navbar, Nav } from 'react-bootstrap';

export const Navigation = () => {
    return (
        <>
        <Navbar collapseOnSelect fixedtop='top' expanded='sm' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
        <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav>
        <Nav.Link href="/features/users/UserList">Times</Nav.Link>
        <Nav.Link href="/jogo-list">Jogos</Nav.Link>
        </Nav>
        </Navbar.Collapse>
        </Navbar>
        </>
    )
}
