import { Book } from 'react-bootstrap-icons';
import Href from "../../../components/Href"
import SearchBar from "../../../components/SearchBar"
// import Stats from "./Stats"
// import StatsMui from "./StatsMui"


const Header = () => {

    // const search_examples = ['COL1A1', 'P16581', 'cholesterol']
    const search_examples = JSON.parse(process.env.SEARCH_EXAMPLES);

    const project_name = process.env.PROJECT_NAME

    return (
        <div>
            {/* Title & subtitle */}
            <div style={{textAlign:"center"}}>
                <h1 className="hl_color">{project_name}</h1>
                <h4>An atlas of genetic scores for prediction of multi-omics data</h4>
            </div>

            {/* Search bar */}
            {/* <div id='home_search_bar' className="large_search_bar col-12 col-sm-12 offset-sm-0 col-md-10 offset-md-1 col-xl-8 offset-xl-2"> */}
            <div id='home_search_bar' className="large_search_bar mt-3">
                <div className='col-12 col-sm-12 offset-sm-0 col-md-10 offset-md-1 col-xl-8 offset-xl-2'>
                    <SearchBar/>
                    <div className='mt-1'>Examples: {search_examples.map((example_term, index) => <span key={'search_'+example_term}>{index > 0 ? ', ': ''}<Href text={example_term} href={'/search?q='+example_term}/></span>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;