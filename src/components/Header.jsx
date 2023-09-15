
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { config } from "../pages/Tests/Search/config";

import { SearchProvider, SearchBox } from "@elastic/react-search-ui";
import "@elastic/react-search-ui-views/lib/styles/styles.css";


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
                            <Nav.Link href="/Applications">Applications</Nav.Link>
                            <Nav.Link href="/">Submit Score</Nav.Link>
                            <Nav.Link href="/">FAQs</Nav.Link>
                            <Nav.Link href="/">Cohorts</Nav.Link>
                            <Nav.Link href="#about">About</Nav.Link>
                        </Nav>
                        <SearchProvider
                            config={{
                                ...config,
                                trackUrlState: false
                            }}
                            >
                            <SearchBox
                                className="d-flex search_btn" 
                                onSubmit={(searchTerm) => {
                                    window.location.href = `/search?q=${searchTerm}`;
                                }}
                                autocompleteMinimumCharacters={3}
                                autocompleteResults={{
                                    linkTarget: "",//"_blank",
                                    sectionTitle: "Suggestions",
                                    titleField: "label",
                                    //urlField: "label",
                                    shouldTrackClickThrough: true,
                                    clickThroughTags: ["search"]
                                }}
                                autocompleteSuggestions={true}
                                debounceLength={0}
                            />
                        </SearchProvider>
                        {/* <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-primary">Search</Button>
                        </Form> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;