export default ({text, type}) => {
    return (
        <div>
            {text && type ? 
                <div className={`block p-4 mb-4 rounded-lg text-sm dark:bg-gray-800 ${type ? type : ''}`}>
                    <div>{text}</div>
                </div> 
            : null}
        </div>
    )
}