import { useEffect, useState } from "react";
import userService from "../services/user.service.tsx";
import {
    Box,
    Button,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    Paper, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { Setup, UserPolicyDetail } from "../models/user.models.tsx";
import CreatePoliciesToUser from "./CreatePoliciesToUser.tsx";

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

function UserPoliciesTable(props: {
    userId: number,
    setup: Setup,
    updateData: any[]
}) {
    const [policies, setPolicies] = useState([])

    const [policySelected, setPolicySelected] = useState<UserPolicyDetail>(null)

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const exec = async () => {
            await getPoliciesByUser();
        }
        exec()
    }, [props.updateData])

    const selectPolicy = (_policy) => {
        setPolicySelected(_policy)
        setOpen(true)
    }

    const getPoliciesByUser = async () => {
        const userPolicies = await userService.policiesByUser(props.userId);
        const setReferenceRol = () => {
            return userPolicies.data.map(value => {
                return {...value, role_reference: props.setup?.roles?.find(r => r.id===value.role.reference)}
            })
        }
        setPolicies(setReferenceRol())
    }

    const deletePolicy = async (id: number) => {
        const canDelete = confirm('Esta usted seguro de eliminar esta politica?');
        if (canDelete) {
            await userService.deletePolicy(id);
            await getPoliciesByUser();
        }
    }

    useEffect(() => {
        if (props.userId) {
            getPoliciesByUser();
        }
    }, [props.userId])

    return (
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} size={'small'}>
                        <TableHead>
                            <TableCell>ID</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Planta</TableCell>
                            <TableCell>Aplicación</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableHead>
                        <TableBody>
                            {
                                policies.map((policy) => (
                                        <TableRow key={policy.id}>
                                            <TableCell component="th" scope="user">{policy.id}</TableCell>
                                            <TableCell component="th"
                                                       scope="user">{policy.role_reference?.description || policy.role?.description}</TableCell>
                                            <TableCell component="th" scope="user">{policy.tenant.name}</TableCell>
                                            <TableCell component="th" scope="user">{policy.application.name}</TableCell>
                                            <TableCell component="th" scope="user">
                                                <Stack direction="row" spacing={2}>
                                                    <Button onClick={() => deletePolicy(policy.id)} variant="outlined"
                                                            startIcon={<DeleteIcon/>}>
                                                        Delete
                                                    </Button>
                                                    <Button onClick={() => selectPolicy(policy)} variant="contained"
                                                            endIcon={<SendIcon/>}>
                                                        Editar
                                                    </Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Creación de usuario"}
                    </DialogTitle>
                    <DialogContent>
                        <CreatePoliciesToUser isUpdated={() => {
                            getPoliciesByUser()
                        }}
                                              data={policySelected}
                                              setup={props.setup}
                                              userId={props.userId}></CreatePoliciesToUser>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cerrar</Button>
                    </DialogActions>
                </Dialog>
            </Box>
    )
}

export default UserPoliciesTable