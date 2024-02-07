import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
const Users = () => {
    const columns = [
        { field: 'name', header: 'NAME' },
        { field: 'email', header: 'EMAIL' },
        { field: 'newJobTitle', header: 'JOB FUNCTION' },
        { field: 'companyName', header: 'COMPANY PROFILE' },
        {
            field: 'address.firstName', header: 'USER WORK ADDRESS',
            body: (rowData) => rowData.address?.firstName || 'N/A'
        },
        { field: 'registeredOn', header: 'REGISTERED',
            body: (rowData) => rowData.registeredOn || 'N/A'
        },
        { field: 'lastLogin', header: 'LAST LOGIN',
            body: (rowData) => rowData.lastLogin || 'N/A'
        },
        { field: 'activeCheck', header: 'ACTIVE',
        }
    ];

    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        const result = await axios.get('http://localhost:3030/results');
        setUsers(result.data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="container">
            <DataTable value={users} showGridlines tableStyle={{ minWidth: '50rem' }} responsive="true" >
                {columns.map((col, i) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        body={(rowData) => {
                            const fieldParts = col.field.split('.');
                            let value = rowData;
                            for (let part of fieldParts) {
                                if (value && value.hasOwnProperty(part)) {
                                    value = value[part];
                                } else {
                                    value = null;
                                    break;
                                }
                            }
                            return value !== null || "" ? value : 'N/A';
                        }}
                        
                    />
                ))}
            </DataTable>
            <footer>Footer</footer>
        </div>
    );
};

export default Users;
