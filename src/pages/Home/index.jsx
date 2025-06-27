import DocumentTitle from '../../components/DocumentTitle';
import Header from "./components/Header"
import Stats from "./components/Stats"
import About from "./components/About"
import Platforms from "./components/Platforms"
import Applications from "./components/Applications"
import DataDownloads from "./components/DataDownloads"
import Feedback from "./components/Feedback"
import Citation from "./components/Citation"
import Supports from "./components/Supports"


const Home = () => {
    DocumentTitle('Homepage');
    return (
        <>
            <Header/>
            <Stats/>
            <About/>
            <Platforms/>
            <Applications/>
            <DataDownloads/>
            <Feedback/>
            <Citation/>
            <Supports/>
        </>
    );
}

export default Home;