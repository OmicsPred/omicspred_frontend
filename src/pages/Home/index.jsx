import Header from "./components/Header"
import Platforms from "./components/Platforms"
import Applications from "./components/Applications"
import Citation from "./components/Citation"
import Feedback from "./components/Feedback"
import Supports from "./components/Supports"


function Home() {
  return (
    <>
      <Header/>
      <Platforms/>
      <Applications/>
      <Citation/>
      <Feedback/>
      <Supports/>
    </>
  );
}

export default Home;