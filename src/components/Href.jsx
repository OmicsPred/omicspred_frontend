import { BoxArrowUpRight, EnvelopeAt } from 'react-bootstrap-icons';

const Href = (props) => {

    let extra_classes = '';
    let title = '';
    const button_classes = 'btn btn-op shadow'
    // const button_small_classes = ' btn-sm btn-op shadow'

    if (props.title) {
        title = props.title;
    }

    if (props.role=='button') {
        extra_classes = button_classes;
    }
    else if (props.role=='button-small') {
        extra_classes = button_classes+' btn-sm';
    }

    let text_content = '';
    if (props.icon) {
        text_content = <>{props.icon}{props.icon && <span className='me-2'></span>}<span>{props.text}</span></>;
    }
    else {
        text_content = props.text;
    }

    // Internal link
    if (props.role=='email') {
        return(
            <a href={"mailto:"+props.href} rel="noreferrer"><EnvelopeAt className='me-1'/>{text_content}</a>
        )
    }
    else {
        if (props.href.startsWith('/') || props.href.startsWith('#')) {
            if (props.target && props.target=='blank') {
                return(
                    <a href={props.href} target="_blank" className={extra_classes} title={title}>{text_content}</a>
                );
            }
            return(
                <a href={props.href} className={extra_classes} title={title}>{text_content}</a>
            );
        }
        // External link
        else {
            // Without external link icon
            if (props.no_external_icon) {
                return(
                    <a href={props.href} className={extra_classes} title={title} target="_blank" rel="noreferrer">{text_content}</a>
                );
            }
            // With external link icon
            return(
                <a href={props.href} className={"external-link"+extra_classes} title={title} target="_blank" rel="noreferrer">
                    {text_content}<BoxArrowUpRight/>
                </a>
            );
        }
    }
}
export default Href ;