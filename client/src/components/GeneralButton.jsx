function GeneralButton ({type, text, onClick, className}) {
    return (
        <button className = {className} type = {type} onClick={onClick}>{text}</button>
    )
}

export default GeneralButton