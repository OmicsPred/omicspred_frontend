
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SearchBar from './SearchBar';


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
                            <NavDropdown title="Browse" id="basic-nav-dropdown" renderMenuOnMount={true}>
                                <NavDropdown.Item href="/scores">Scores</NavDropdown.Item>
                                <NavDropdown.Item href="/publications">Publications</NavDropdown.Item>
                                <NavDropdown.Item href="/platforms">Platforms</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="PheWAS" id="basic-nav-dropdown" renderMenuOnMount={true}>
                                <NavDropdown.Item href="/applications/phecode/sum">Summary</NavDropdown.Item>
                                <NavDropdown.Item href="/applications/phecode/full">All Associations</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href={process.env.OMICSPRED_SUBMIT_SCORES_URL} target="_blank">Submit Score</Nav.Link>
                            <Nav.Link href="/faqs">FAQs</Nav.Link>
                            <Nav.Link href="/cohorts">Cohorts</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                        </Nav>
                        {/* <SearchProvider
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
                        </SearchProvider> */}
                        {/* <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-primary">Search</Button>
                        </Form> */}
                        { window.location.pathname == '/' ? '':<SearchBar/> }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;