
export const thousandifyNumber = function(number) {
    if (number !== undefined) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return ''
}

export const numberBadge = function(number) {
    return <span className="badge rounded-pill text-bg-primary">{thousandifyNumber(number)}</span>
}