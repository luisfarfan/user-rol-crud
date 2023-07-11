import { User } from "../models/user.models.tsx";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const UsersListTable = (props: {
    users: User[], selectUser: CallableFunction
}) => {
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID'},
        {field: 'short_email', headerName: 'Email Corto', width: 200},
        {field: 'large_email', headerName: 'Email Largo', width: 200}
    ];

    const rowIsSelected = (rowModel: GridRowSelectionModel) => {
        const userId = rowModel[0];
        props.selectUser(userId)
    }
    return (<Box>
                <DataGrid
                        rows={props.users}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {page: 0, pageSize: 5},
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        onRowSelectionModelChange={rowIsSelected}
                />
            </Box>
    )
}

export default UsersListTable