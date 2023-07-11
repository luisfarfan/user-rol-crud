import { Controller, useForm } from 'react-hook-form';
import { Alert, Button, Card, CardActions, CardContent, Snackbar, Stack, TextField } from '@mui/material';
import userService from "../services/user.service.tsx";
import { useState } from "react";


const UserForm = (props: {
    userIsUpdate?: CallableFunction
}) => {
    const {handleSubmit, control, reset, formState: {errors}} = useForm();
    const [open, setOpen] = useState(false);

    const onSubmit = async (data) => {
        await userService.createUser(data)
        props.userIsUpdate(true)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleReset = () => {
        reset({short_email: "", large_email: ""});
        setOpen(false);
    }

    return (
            <Card>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <Controller
                                name="short_email"
                                control={control}
                                rules={{
                                    required: 'Este campo es obligatorio',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'Correo inválido',
                                    },
                                }}
                                defaultValue=""
                                render={({field}) => (
                                        <TextField {...field} label="Short Email" fullWidth/>
                                )}
                        />
                        {errors.short_email &&
                            <Stack spacing={1}>
                                <Alert severity="error">{errors.short_email.message as any}</Alert>
                            </Stack>
                        }
                        <Controller
                                name="large_email"
                                control={control}
                                rules={{
                                    required: 'Este campo es obligatorio',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'Correo inválido',
                                    },
                                }}
                                defaultValue=""
                                render={({field}) => (
                                        <TextField {...field} label="Large Email" fullWidth/>
                                )}
                        />
                        {errors.large_email &&
                            <Stack spacing={1}>
                                <Alert severity="error">{errors.large_email.message as any}</Alert>
                            </Stack>
                        }
                    </CardContent>
                    <CardActions>
                        <Button type="submit" variant="contained">Guardar</Button>
                        <Button variant="contained" onClick={handleReset}>Limpiar</Button>
                    </CardActions>
                </form>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                        Usuario creado con éxito!
                    </Alert>
                </Snackbar>
            </Card>
    );
};

export default UserForm;
