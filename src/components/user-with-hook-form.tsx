
import {FormContainer,TextFieldElement,AutocompleteElement,CheckboxButtonGroup} from 'react-hook-form-mui'
import { useState } from 'react';

function UserWithHookForm(){
  const [errors, setErrors]=useState({age:null, name:null})
  return (
    <>
      <FormContainer
        defaultValues={{ name: '', age: '', city:'',roles:[],plants:[] }}
        onSuccess={(data)=>{
          const error={
            age:null,
            name:null
          }
          console.log(data)
          if(data.name===''){
            error.name='el campo name no debe estar vacio'
          }
          if(data.age===''){
            error.age='el campo age no debe de estar vacio'
          }

          setErrors(error)

        }}
      >
        <h1>User</h1>
        <br/>
        <TextFieldElement className='input'
                          label="age"
                          name="age"
                          margin='normal'
                          inputMode='numeric'
                          validation={{
                            min: 5,
                            max:80,
                            pattern:RegExp('^(0?[1-9]|[1-9][0-9]|[1][0-2][0-9]|130)$')
                          }}



        />
        {errors.age && <p className='errors'>{errors.age}</p>}
        <TextFieldElement className='input'
                          label="name"
                          name="name"
                          margin='normal'
                          inputMode='text'
                          validation={{
                            minLength:5,
                            maxLength:20,
                            pattern: RegExp('^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\\s]+$')
                          }}
        />
        {errors.name && <p className='errors'>{errors.name}</p>}
        <AutocompleteElement
          name="city"
          options={[
            {
              id: 1,
              label: 'Santa Fe'
            },
            {
              id: 2,
              label: 'Cali'
            },
            {
              id: 3,
              label: 'Guaya'
            },
          ]}
          required
        />
        <br/>
        <AutocompleteElement
          label="Roles"
          multiple
          name="roles"
          options={[
            {
              id: 1,
              label: 'Usuario'
            },
            {
              id: 2,
              label: 'Operario'
            },
            {
              id: 3,
              label: 'Administrador'
            },

          ]}
          required
        />
        <br/>
        <CheckboxButtonGroup
          label="Plants"
          name="plants"
          options={[
            {
              id: 'Planta 1',
              label: 'Planta 1'
            },
            {
              id: 'Planta 2',
              label: 'Planta 2'
            },
            {
              id: 'Planta 3',
              label: 'Planta 3'
            },
            {
              id: 'Planta 4',
              label: 'Planta 4'
            },
            {
              id: 'Planta 5',
              label: 'Planta 5'
            }
          ]}
          row
        />
        <input className='submit' type='submit' value='Register'/>
      </FormContainer>
      </>
  );
}

export default UserWithHookForm;