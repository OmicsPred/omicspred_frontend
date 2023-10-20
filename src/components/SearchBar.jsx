import {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SearchBar = () => {

    const [searchInput, setSearchInput] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (searchInput) {
            window.location.replace('/search?q='+searchInput)  // redirects if no errors
        }
    }

    return (
        <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={e => setSearchInput(e.target.value)}
            />
            <Button variant="outline-primary" >Search</Button>
        </Form>
    )
}

export default SearchBar;