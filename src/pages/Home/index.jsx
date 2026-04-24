import DocumentHead from '../../components/DocumentHead';
import Header from "./components/Header"
import Stats from "./components/Stats"
import About from "./components/About"
import Platforms from "./components/Platforms"
import DataDownloads from "./components/DataDownloads"
import Feedback from "./components/Feedback"
import Citation from "./components/Citation"
import Supports from "./components/Supports"


const Home = () => {
    return (
        <>
            <DocumentHead title='Homepage'/>
            <Header/>
            <Stats/>
            <About/>
            <Platforms/>
            <DataDownloads/>
            <Citation/>
            <Feedback/>
            <Supports/>
        </>
    );
}

export default Home;