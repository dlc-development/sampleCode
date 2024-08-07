const BottomForm = (props) => {
    let {buttonText} = props;
    if(!buttonText) buttonText = "Find my options";
    return(
        <div className='bottom-form'>
            <p>
                By clicking "{buttonText}", I confirm I've read and agree to Nomad Credit's <a href='/terms'>Terms of Use</a> and <a href='/privacy'>Privacy Policy</a>
            </p>
            <p className='have-account'>Already have an account? <a href='/sign-in'>Sign In</a></p>
        </div>
    )
}

export default BottomForm;