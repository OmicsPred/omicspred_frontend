
const Container = (props) => {
    const title = props.title;
    const label = props.content.label;
    const desc = props.content.desc;
    const content = props.content.struct;
    const prefix = props.prefix;

    return (
        <div id={prefix+label} className="mt-5">
            <h4>{title}</h4>
            { desc && desc != '' ? <div className="mb-3">{desc}</div> : '' }
            <table className="table table-striped-columns" style={{width:"auto", border:"1px solid rgb(222, 226, 230)"}}>
                <tbody>
                    { content.map((entry, index)=> <tr key={typeof(entry.name) == 'string' ? entry.name : index}><td className="d-none"></td><td>{entry.name}</td><td>{entry.desc}</td></tr>) }
                </tbody>
            </table>
        </div>
    );
};

export default Container;
