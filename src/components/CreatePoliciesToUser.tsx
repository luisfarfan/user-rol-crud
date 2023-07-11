import { Application, Permission, Setup, UserPolicyDetail } from "../models/user.models.tsx";
import {
    Alert,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    MenuItem,
    Select, Snackbar
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import userService from "../services/user.service.tsx";

const CreatePoliciesToUser = (props: {
    userId: number,
    setup: Setup,
    data?: UserPolicyDetail,
    isUpdated: CallableFunction
}) => {
    const [apps, setApps] = useState<Application[]>([])

    const [perms, setPerms] = useState<Permission[]>([])

    const {
        handleSubmit,
        control,
        watch,
        setValue
    } = useForm({
        defaultValues: {
            permissions_id: [],
            tenant_id: props?.data?.tenant?.id || null,
            role_id: props?.data?.role?.reference || null,
            applications_id: props?.data?.application_id || []
        }
    });

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const watch_tenant = watch('tenant_id')

    const watch_role = watch('role_id')

    useEffect(() => {
        if (watch_tenant) {
            const applications = getAppsFromTenant(watch_tenant);
            setApps(applications);
        }
    }, [watch_tenant])

    useEffect(() => {
        if (watch_role) {
            const permissions = getPermissionsFromRole(watch_role)
            if (permissions && permissions?.length) {
                setPerms(permissions)
            }
        }
    }, [watch_role])

    useEffect(() => {
        if (props.data?.tenant?.id) {
            setValue('tenant_id', props.data.tenant.id)
            setValue('applications_id', props.data.application_id)
        }

        if (props?.data?.role_id) {
            setValue('role_id', props.data.role.reference)
            setValue('permissions_id', props.data.role.permissions.map(p => p.id))
        }

    }, [props.data])

    const getPermissionsFromRole = (roleId: number) => {
        return props.setup.roles.find(r => r.id===roleId)?.permissions
    }

    const getAppsFromTenant = (tenantId: number) => {
        const tenantSelected = props.setup.tenants.find(t => t.id===tenantId);
        return tenantSelected.applications;
    }

    const createPolicy = async (data) => {
        await userService.createPolicy({...data, user_id: props.userId});
        setOpen(true);
        props.isUpdated(true)
    }

    const editPolicy = async (data) => {
        await userService.editPolicy({...data, user_id: props.userId, id: props.data.id})
        setOpen(true);
        props.isUpdated(true)
    }

    const onSubmit = async (data) => {
        if (props.data) {
            await editPolicy(data)
        } else {
            await createPolicy(data)
        }
    };

    return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth variant="filled" margin="normal">
                    <FormLabel>Seleccione la planta</FormLabel>
                    <Controller
                            name="tenant_id"
                            control={control}
                            render={({field}) => (
                                    <Select {...field}>
                                        {props.setup.tenants.map((plant) => (
                                                <MenuItem key={plant.id} value={plant.id}>
                                                    {plant.name}
                                                </MenuItem>
                                        ))}
                                    </Select>
                            )}
                    />
                </FormControl>
                {
                    props.data ? (
                            <FormControl fullWidth variant="filled" margin="normal">
                                <FormLabel>Aplicaciones</FormLabel>
                                <Controller
                                        name="applications_id"
                                        control={control}
                                        render={({field}) => (
                                                <Select
                                                        {...field}
                                                >
                                                    {apps.map((app) => (
                                                            <MenuItem key={app.id} value={app.id}>
                                                                {app.name}
                                                            </MenuItem>
                                                    ))}
                                                </Select>
                                        )}
                                />
                            </FormControl>
                    ):<FormControl fullWidth variant="filled" margin="normal">
                        <FormLabel>Aplicaciones</FormLabel>
                        <Controller
                                name="applications_id"
                                control={control}
                                render={({field}) => (
                                        <Select multiple {...field}>
                                            {apps.map((app) => (
                                                    <MenuItem key={app.id} value={app.id}>
                                                        {app.name}
                                                    </MenuItem>
                                            ))}
                                        </Select>
                                )}
                        />
                    </FormControl>
                }

                <FormControl fullWidth variant="filled" margin="normal">
                    <FormLabel>Roles</FormLabel>
                    <Controller
                            name="role_id"
                            control={control}
                            render={({field}) => (
                                    <Select
                                            {...field}
                                    >
                                        {props.setup.roles.map((role) => (
                                                <MenuItem key={role.id} value={role.id}>
                                                    {role.description}
                                                </MenuItem>
                                        ))}
                                    </Select>
                            )}
                    />
                </FormControl>

                <FormControl fullWidth component="fieldset" variant="standard">
                    <FormLabel component="legend">Permisos</FormLabel>
                    <FormGroup>
                        <Controller
                                name="permissions_id"
                                control={control}
                                render={({field}) => (
                                        <>
                                            {perms.map((perm) => (
                                                    <FormControlLabel
                                                            key={perm.id}
                                                            label={perm.name}
                                                            control={
                                                                <Checkbox
                                                                        value={perm.id}
                                                                        // For some reason codesandbox doesn't support `field.value.includes(...)`
                                                                        checked={field.value?.some(
                                                                                (existingValue) => existingValue===perm.id
                                                                        )}
                                                                        onChange={(event, checked) => {
                                                                            if (checked) {
                                                                                field.onChange([
                                                                                    ...field.value,
                                                                                    +event.target.value
                                                                                ]);
                                                                            } else {
                                                                                field.onChange(
                                                                                        field.value.filter(
                                                                                                (value) => value!== +event.target.value
                                                                                        )
                                                                                );
                                                                            }
                                                                        }}
                                                                />
                                                            }
                                                    />
                                            ))}
                                        </>
                                )}
                        />
                    </FormGroup>
                </FormControl>

                <Button variant="contained" color="primary" type="submit">
                    Crear
                </Button>

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                        La policy ha sido creada con éxito!
                    </Alert>
                </Snackbar>
            </form>
    );
}

export default CreatePoliciesToUser
