

import {FormContainer,TextFieldElement,AutocompleteElement,CheckboxButtonGroup} from 'react-hook-form-mui'

function App() {

    return (
            <>
              <div className='form-control'>
                <FormContainer
                  defaultValues={{ name: '', age: '', city:'',roles:[],plants:[] }}
                  onSuccess={(data)=>console.log(data)}
                 >
                  <h1>User</h1>
                  <br/>
                  <TextFieldElement className='input'
                    label="age"
                    name="age"
                                    margin='normal'
                                    required
                                    inputMode='numeric'
                                    validation={{
                                      min: 5,
                                      max:80,
                                      pattern:RegExp('^(0?[1-9]|[1-9][0-9]|[1][0-2][0-9]|130)$')
                                    }}

                  />
                  <TextFieldElement className='input'
                    label="name"
                    name="name"
                                    margin='normal'
                                    required
                                    inputMode='text'
                                    validation={{
                                      minLength:5,
                                      maxLength:20,
                                      pattern: RegExp('^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\\s]+$')
                                    }}
                  />
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
              </div>

            </>
    )
}

export default App
