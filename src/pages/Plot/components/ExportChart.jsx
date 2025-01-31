import { Download, FiletypePng } from 'react-bootstrap-icons';

const ExportChart = (props) => {

    const export_function = props.export_function

    return (
        <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-op shadow" onClick={export_function}>
                <Download size={20} /><span className="px-2">Export as image</span><span className='extra_icon'><FiletypePng/></span>
            </button>
        </div>
    )
}

export default ExportChart;