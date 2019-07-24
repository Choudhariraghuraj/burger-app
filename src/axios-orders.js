import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://my-react-burger-apl.firebaseio.com/'
})
export default instance