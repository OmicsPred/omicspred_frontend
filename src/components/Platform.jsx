import React, { Component, useEffect, useState } from "react"
import PlatformListing from "./PlatformListing";

const url = "http://127.0.0.1:7000/rest/platform/all?format=json";

class Platform extends Component{
    constructor(props){
        super(props);
        this.state={
            platform:''
        }
    }
    render(){
        return(
            <>
                <PlatformListing datalist={this.state.platform}/>
            </>
        )
    }

    componentDidMount(){
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({platform:data['results']})
            })
    }

}

export default Platform