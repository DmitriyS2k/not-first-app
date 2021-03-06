import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { DataGrid } from '@mui/x-data-grid';
import userStore from '../store/userStore';
import Loading from '../components/Loading';
import UserListControlPanel from '../components/UI/UserListControlPanel';
import ChangeUserModal from '../components/ChangeUserModal';
import DeleteUserConfirm from '../components/DeleteUserConfirm';
import UserAvatar from '../components/UserAvatar';

function UsersListPage() {
  const {
    getUsersData, usersList, deleteUser, isDataLoad,
  } = userStore;
  const [limitUsersList, setLimitUsersList] = React.useState(10);

  React.useEffect(() => {
    setTimeout(() => {
      getUsersData();
    }, 500);
  }, [limitUsersList]);

  const limitPagesFn = (count) => {
    setLimitUsersList(count);
  };

  const columns = [
    {
      field: 'avatar',
      headerName: 'Pic',
      width: 60,
      type: 'string',
      sortable: false,
      renderCell: (avatar) => (
        <UserAvatar userData={avatar} />
      ),
    },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'E-mail', width: 180 },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'number',
      width: 180,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
      valueGetter: (gender) => (+gender.value ? 'М' : 'Ж'),
    },
    {
      field: 'buttons',
      headerName: 'Actions',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      renderCell: (user) => (
        <>
          <ChangeUserModal userId={user.id} />
          <DeleteUserConfirm delUser={() => deleteUser(user.id)} />
        </>
      ),
    },
  ];

  const rows = usersList.slice();

  return (
    <div>
      <h2>Список юзеров</h2>
      {isDataLoad ? (
        <>
          <UserListControlPanel fnLimit={limitPagesFn} />
          <div style={{ width: 950 }}>
            <DataGrid
              disableColumnMenu
              autoHeight
              rows={rows}
              columns={columns}
              pageSize={limitUsersList}
              rowsPerPageOptions={[limitUsersList]}
              sx={{
                padding: 1,
                boxShadow: 2,
                border: 2,
                borderColor: 'gray',
                '& .MuiDataGrid-cell:hover': {
                  color: '#51c3e1',
                },
              }}
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default observer(UsersListPage);
