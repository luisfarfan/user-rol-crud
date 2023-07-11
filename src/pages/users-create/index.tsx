import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "../../controls/FormInput.tsx";

function CreateUserPage() {
    const defaultValues = {
        short_email: '',
        large_email: ''
    };
    const methods = useForm({defaultValues});
    const {handleSubmit, control} = methods
    const onSubmit = (data) => console.log(data);

    return (
            <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
            >
                <div>
                    <FormInput name={'short_email'} control={control} label={'Email Corto'}></FormInput>
                    <FormInput name={'large_email'} control={control} label={'Email Largo'}></FormInput>
                </div>

                <Button variant={'outlined'} onClick={handleSubmit(onSubmit)} color="secondary">Crear usuario</Button>
            </Box>
    );
}

export default CreateUserPage