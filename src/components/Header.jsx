
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SearchBar from './SearchBar';
import Href from "./Href"


function Header() {

    const search_examples = JSON.parse(process.env.SEARCH_EXAMPLES);
    const project_name = process.env.PROJECT_NAME

    return (
        <header>
            <Navbar expand="md" sticky="top" position="fixed">
                <Container>
                    <Navbar.Brand href="/">
                    <img
                        className='pe-2'
                        src={'/images/'+project_name+'_logo_white.png'}
                        height='30'
                        alt=''
                        loading='lazy'
                    />{project_name}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <NavDropdown title="Browse" id="browse-nav-dropdown" renderMenuOnMount={true}>
                                <NavDropdown.Item href="/scores">Scores</NavDropdown.Item>
                                <NavDropdown.Item href="/publications">Publications</NavDropdown.Item>
                                <NavDropdown.Item href="/platforms">Platforms</NavDropdown.Item>
                                <NavDropdown.Item href="/pathways">Pathways</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="PheWAS" id="phewas-nav-dropdown" renderMenuOnMount={true}>
                                <NavDropdown.Item href="/applications/phecode/sum">Summary</NavDropdown.Item>
                                <NavDropdown.Item href="/applications/phecode/full">All Associations</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href={process.env.PROJECT_SUBMIT_SCORES_URL} target="_blank">Submit Score</Nav.Link>
                            <Nav.Link href="/downloads">Downloads</Nav.Link>
                            {/* <Nav.Link href="/faqs">FAQs</Nav.Link>
                            <Nav.Link href="/cohorts">Cohorts</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link> */}
                            <NavDropdown title="About" id="about-nav-dropdown" renderMenuOnMount={true}>
                                <NavDropdown.Item href="/about">About {process.env.PROJECT_NAME}</NavDropdown.Item>
                                <NavDropdown.Item href="/cohorts">Cohorts</NavDropdown.Item>
                                <NavDropdown.Item href="/faqs">FAQs</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        { window.location.pathname == '/' ? '':<div id='nav_search_bar'><SearchBar/></div> }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* Only displayed in small screens */}
            <div className='bg-light search_box_2'>
                <div className='large_search_bar col-10 offset-1'>
                    <SearchBar/>
                    <div className='op_examples mt-1'>Examples: {search_examples.map((example_term, index) => <span key={'search_'+example_term}>{index > 0 ? ', ': ''}<Href text={example_term} href={'/search?q='+example_term}/></span>)}</div>
                </div>
            </div>
        </header>
    );
}

export default Header;