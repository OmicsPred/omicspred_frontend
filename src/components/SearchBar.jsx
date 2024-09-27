import {useState} from 'react'
import Form from 'react-bootstrap/Form';

const SearchBar = (props) => {

    const [searchInput, setSearchInput] = useState("");

    const project_name = process.env.PROJECT_NAME

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (searchInput) {
            window.location.replace('/search?q='+searchInput)  // redirects if no errors
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="d-flex" >
                <Form.Control
                    type="search"
                    placeholder={"Search "+project_name}
                    className="me-2 search_input"
                    aria-label="Search"
                    onChange={e => setSearchInput(e.target.value)}
                />
                <button type="submit" className="btn btn-search">Search</button>
            </Form.Group>
        </Form>
    )
}

export default SearchBar;