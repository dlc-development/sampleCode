import { useState} from 'react';
import PhoneInput from 'react-phone-number-input';

const PhoneField = (props) => {
    let defaultValue = props.defaultValue
    if(!defaultValue) defaultValue = null;
    const [value, setValue] = useState(defaultValue)
    let name = props.name;
    if(!name) name = "phone_number"
    return(
        <PhoneInput
            className='phone-field'
            name={name}
            defaultCountry="IN"
            value={value}
            required
            onChange={setValue} />
    )
}

export default PhoneField;