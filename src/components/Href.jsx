import { BoxArrowUpRight } from 'react-bootstrap-icons';

const Href = (props) => {

    let extra_classes = '';
    let title = '';
    const button_classes = ' btn btn-primary shadow'
    const button_small_classes = ' btn-sm btn-primary shadow'

    if (props.title) {
        title = props.title;
    }

    if (props.role=='button') {
        extra_classes = button_classes;
    }
    else if (props.role=='button-small') {
        extra_classes = button_classes+' btn-sm';
    }

    // Internal link
    if (props.href.startsWith('/')) {
        return(
            <a href={props.href} className={extra_classes} title={title}>
                {props.icon}{props.icon && <span className='me-2'></span>}{props.text}
            </a>
        );
    }
    // External link
    else {
        // Without external link icon
        if (props.no_external_icon) {
            return(
                <a href={props.href} className={extra_classes} title={title} target="_blank">
                    {props.icon}{props.icon && ' '}{props.text}
                </a>
            );
        }
        // With external link icon
        else {
            return(
                <a href={props.href} className={"external-link"+extra_classes} title={title} target="_blank">
                    {props.icon}{props.icon && ' '}{props.text}<BoxArrowUpRight/>
                </a>
            );
        }
    }
}

export default Href ;