import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/mv_share.jpg';

export const Navigation = () => {
    return (
        <>
        <Navbar collapseOnSelect fixedtop='top' expanded='sm' bg='dark' variant='dark'>
        <Navbar.Brand href="/"><img src={logo} alt="MV" height="40px"/> </Navbar.Brand>
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
