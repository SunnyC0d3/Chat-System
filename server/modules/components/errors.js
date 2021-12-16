const getError = ({ success = false, message = success ? '' : 'Kindly fix the error(s)', errors = {} }) => ({ success, message, errors });

export default getError;
