import React from 'react'

export default function Form(props) {
    const {
        values, submit, change, disabled, errors,
    } = props
    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }
    const onChange = evt => {
        /* 🔥 FIX THIS SO IT ALSO WORKS WITH CHECKBOXES */
        const { name, value, type, checked } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        change(name, valueToUse)
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <h2>Add yourself to the team!</h2>


            </div>
            <div>
                <label>First name:
                    <input
                        type='text'
                        name='first_name'
                        value={values.first_name}
                        onChange={onChange}
                        placeholder='First Name' />
                </label>
                <label>Last name:
                    <input
                        type='text'
                        name='last_name'
                        value={values.last_name}
                        onChange={onChange}
                        placeholder='Last Name' />
                </label>
                <label>Email
                    <input
                        type='email'
                        name='email'
                        value={values.email}
                        onChange={onChange}
                        placeholder='Email' />
                </label>
                <label>Password:
                <input
                        type='password'
                        name='password'
                        value={values.password}
                        onChange={onChange}
                        placeholder='Password'
                    />
                </label>
                <label>Do you agree to the terms and conditions?
                <input
                        type="checkbox"
                        name="terms"
                        value={values.terms}
                        onChange={onChange} />
                </label>
            </div>
            <button disabled={disabled}>Submit!</button>
            <div className='errors'>
                {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
                <div>{errors.first_name}</div>
                <div>{errors.last_name}</div>
                <div>{errors.email}</div>

            </div>


        </form >
    )
}