import crypto from 'crypto';

const generateToken = () =>{
    return crypto.randomBytes(32).toString('hex');

}
export default generateToken;