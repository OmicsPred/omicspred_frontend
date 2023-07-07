
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Header() {
    return (
        <header>
            <Navbar bg="light" expand="lg" sticky="top" position="fixed">
                <Container>
                    <Navbar.Brand href="/">
                    <img
                        className='pe-2'
                        src='/images/OmicsPred_logo.png'
                        height='30'
                        alt=''
                        loading='lazy'
                    />OmicsPred
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/Scores">Scores</Nav.Link>
                            <Nav.Link href="/">Applications</Nav.Link>
                            <Nav.Link href="/">Submit Score</Nav.Link>
                            <Nav.Link href="/">FAQs</Nav.Link>
                            <Nav.Link href="/">Cohorts</Nav.Link>
                            <Nav.Link href="#about">About</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-primary">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;