import { People } from 'react-bootstrap-icons';

export const thousandifyNumber = function(number) {
    if (number !== undefined) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return ''
}

export const numberBadge = function(number,title) {
    if (title) {
        return <span className="badge rounded-pill text-bg-primary" title={title}>{thousandifyNumber(number)}</span>
    }
    else {
        return <span className="badge rounded-pill text-bg-primary">{thousandifyNumber(number)}</span>
    }
}

export const participantsBadge = function(number) {
    return <span className="badge rounded-pill text-bg-primary" title="# of Participants"><People className='me-1' style={{fontSize:'12px',verticalAlign:'top'}}/>{thousandifyNumber(number)}</span>
}