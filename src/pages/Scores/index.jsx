import Platform from "../../components/Platform"
import Container from 'react-bootstrap/Container';

function Scores() {
    
    return (
        <>
            <div style={{ flex: "1 1 auto" }} className="flex-col w-screen ">
                <Platform />
            </div>
            <div className="mt-4 mb-4">This is a test page to display the different platforms in OmicsPred</div>
        </>
    )
}

export default Scores