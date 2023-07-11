import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import userService from "../../services/user.service.tsx";
import UserPoliciesTable from "../../components/UserPoliciesTable.tsx";
import CreateUser from "../../components/createUser.tsx";
import UsersListTable from "../../components/UsersListTable.tsx";
import CreatePoliciesToUser from "../../components/CreatePoliciesToUser.tsx";
import { Setup } from "../../models/user.models.tsx";

function ListUserPage() {
    const [users, setUsers] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [setupData, setSetupData] = useState({} as Setup);
    const [openPolicyModal, setOpenPolicyModal] = useState(false);

    const [updateInPush, setUpdateInPush] = useState([]);

    const [userId, setUserId] = useState(null);

    const getSetupData = async () => {
        const _setupData = await userService.setup();
        setSetupData({..._setupData.data});
    }

    const getUsers = async () => {
        const _users = await userService.users();
        setUsers(_users.data)
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const selectUser = (id) => {
        setUserId(id)
    }

    const handleClosePolicyModal = () => {
        setOpenPolicyModal(false)
    }

    const updateUser = async () => {
        await getUsers()
    }

    useEffect(() => {
        const _getUsers = async () => {
            await getSetupData();
            await getUsers()
        }
        _getUsers()

    }, [])

    return (
            <Grid container spacing={2} margin={'auto'}>
                <Grid>
                    <Button variant="outlined" onClick={handleOpenModal}>
                        Crear usuario
                    </Button>
                    <UsersListTable users={users} selectUser={selectUser}></UsersListTable>
                </Grid>
                <Grid>
                    {userId ? <>
                        <Button variant="outlined" onClick={() => setOpenPolicyModal(true)}>
                            Crear policies
                        </Button>
                        <UserPoliciesTable updateData={updateInPush} setup={setupData}
                                           userId={userId}></UserPoliciesTable></>:null}
                </Grid>
                <Dialog
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Creación de usuario"}
                    </DialogTitle>
                    <DialogContent>
                        <CreateUser userIsUpdate={updateUser}></CreateUser>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenPolicyModal(true)}>Cerrar</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                        open={openPolicyModal}
                        onClose={handleClosePolicyModal}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Creación de usuario"}
                    </DialogTitle>
                    <DialogContent>
                        <CreatePoliciesToUser isUpdated={() => setUpdateInPush([true])} setup={setupData}
                                              userId={userId}></CreatePoliciesToUser>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClosePolicyModal}>Cerrar</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
    )
}

export default ListUserPage