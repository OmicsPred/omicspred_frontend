import {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SearchBar = (props) => {

    const [searchInput, setSearchInput] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (searchInput) {
            window.location.replace('/search?q='+searchInput)  // redirects if no errors
        }
    }

    // const button_type = "outline-primary";
    // if (props.type == 'home') {
    //     button_type = "primary";
    // }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="d-flex" >
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2 search_input"
                    aria-label="Search"
                    onChange={e => setSearchInput(e.target.value)}
                />
                <Button variant="primary">Search</Button>
            </Form.Group>
        </Form>
    )
}

export default SearchBar;