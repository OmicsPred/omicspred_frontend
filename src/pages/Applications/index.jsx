
function Applications() {

    

    return (
        <>
            <h2 className='page_title'>Applications</h2>
            <div className="mt-4">
                <div className="card-deck">
                    <div className="card ms-2 me-2" style={{padding:"0px",maxWidth:"580px",textAlign:"center"}}>
                        <div className="card-body">
                            <h4 className="card-title mb-4">PheWAS</h4>
                            <p className="card-text">
                                <a className="btn btn-primary shadow mb-3" href="/applications/phecode/sum" role="button">Summary associations</a><br />
                                <a className="btn btn-primary shadow" href="/applications/phecode/full" role="button">Full list associations</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
    
export default Applications