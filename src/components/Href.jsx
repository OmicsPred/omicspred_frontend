import { BoxArrowUpRight } from 'react-bootstrap-icons';

const Href = (props) => {

    // Internal link
    if (props.href.startsWith('/')) {
        return(
            <a href={props.href}>
                {props.icon}{props.icon && ' '}{props.text}
            </a>
        );
    }
    // External link
    else {
        // Without external link icon
        if (props.no_external_icon) {
            return(
                <a href={props.href} target="_blank">
                    {props.icon}{props.icon && ' '}{props.text}
                </a>
            );
        }
        // With external link icon
        else {
            return(
                <a className="external-link" href={props.href} target="_blank"> 
                    {props.icon}{props.icon && ' '}{props.text}<BoxArrowUpRight/>
                </a>
            );
        }
    }
}

export default Href ;