import * as yup from 'yup'

export default yup.object().shape({
    first_name: yup.string().required('First name please'),
    last_name: yup.string().required('Last name NOW!'),
    email: yup.string().email('valid email thanks').required(),
    password: yup.string().required().min(6, 'Password must have atleast 6 characters'),
    terms: yup.boolean().oneOf([true]),
})