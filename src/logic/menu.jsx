import { Navbar, Nav, Container } from 'react-bootstrap';

export const Navigation = () => {
    return (
        <>
        <Navbar collapseOnSelect fixedtop='top' expanded='sm' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
        <Navbar.Collapse id='responsive-navbar-nav'>
            <Container>
        <Nav>
        <Nav.Link href="/">Times</Nav.Link>
        <Nav.Link href="/jogo-list">Jogos</Nav.Link>
        </Nav>
        </Container>
        </Navbar.Collapse>
        </Navbar>
        </>
    )
}
