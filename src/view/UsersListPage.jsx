import React, {useEffect, useState} from 'react';
import userStore from "../store/userStore";
import {observer} from "mobx-react-lite";
import NewUser from "../components/NewUser";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const UsersListPage = () => {
    let { getUserData } = userStore;

    let [ usersDataObj, setUsersDataObj ] = useState([]);

    useEffect(() => {
        setTimeout(getUsers, 2000)
    }, [])

    async function getUsers() {
        let response = await getUserData();
        setUsersDataObj(response);
    }

    return (
        <div>
            <h2>Список юзеров</h2>
            {usersDataObj.length ? <TableContainer component={Paper}>
                <Table sx={{ minWidth: 950 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersDataObj.map(user => <NewUser props={user} key={user.id}/>)}
                    </TableBody>
                </Table>
            </TableContainer> : <Loading/>}
            <Pagination/>
        </div>
    );
};

export default observer(UsersListPage);

