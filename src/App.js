import './App.css';
import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Members from './components/Members'
import * as yup from 'yup'
import schema from './components/formSchema'

//starting form values
const startFormValues = {
  //Text inputs//
  first_name: '',
  last_name: '',
  email: '',
  //Password//
  password: '',
  //Checkbox//
  terms: false,
}
const startFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
}

const startMembers = []
const startDisabled = true

function App() {
  const [members, setMembers] = useState(startMembers)
  const [formValues, setFormValues] = useState(startFormValues)
  const [formErrors, setFormErrors] = useState(startFormErrors)
  const [disabled, setDisabled] = useState(startDisabled)

  //Axios Stuff///
  // const getMembers = () => {
  //   Axios.get('https://reqres.in/api/users')
  //     .then(res => {
  //       setMembers(res.data)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }
  const postNewMember = newMember => {
    Axios.post('https://reqres.in/api/users', newMember)
      .then(res => {
        setMembers([...members, res.data])
        setFormValues(startFormValues)
        console.log('it is working')
      })
      .catch(error => {
        setFormValues(startFormValues)
        console.log(error)
      })
  }
  // Event Handlers////
  const inputChange = (name, value) => {
    // use yup here and schema
    yup.reach(schema, name) //get to this part of schema
      .validate(value) //validate this value
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: '',
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0] // add this error to whatever errors were already in form errors
        })
      })
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY, computed property names
    })
  }
  const formSubmit = () => {
    const newMembers = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    }
    postNewMember(newMembers)
  }
  // Side effects//
  // useEffect(() => {
  //   getMembers()
  // }, [])
  useEffect(() => {
    schema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formValues])


  return (
    <div className="App">
      <header><h1>Join our Team!!</h1></header>
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        members.map(member => {
          return (
            <Members key={member.id} details={member} />
          )
        })
      }
    </div>
  );
}

export default App;
