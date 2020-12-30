import { useState } from 'react';
import yelp from '../api/yelp';


export default () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [country, setCounry] = useState([]);

    const getCountryFromApi = async (objContact) => {
        try {
            setLoading(true);
            setErrorMessage('');
            const response = await yelp.get('/country/');
            console.log(response.data);
            if(response && response.data && response.data.success) {
                setCounry(response.data.country)
                setSuccess(true);
                setLoading(false);
            }
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            setErrorMessage('error was found !!');
        }
    }

    return {
        getCountryFromApi,
        loading,
        errorMessage,
        success,
        country
    };
}


