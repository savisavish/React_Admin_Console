import React, { createContext, useState, useRef, useEffect, Children } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import LoadingSpinner from "../../shared/LoadingSpinner";
import Download from '../../shared/buttons/Download';
import Filter from '../../shared/buttons/Filter';
import Filter_popup from './Filter_popup';

const Users = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const columns = [
        {
            field: 'name', header: 'NAME',
            body: (rowData) => {
                const name = rowData?.name || 'N/A';
                return <NavLink activeclassname="active" to='/users/userinfo' state={rowData}>{name}</NavLink>
            }
        },
        { field: 'email', header: 'EMAIL', body: (rowData) => rowData.email || 'N/A' },
        { field: 'newJobTitle', header: 'JOB FUNCTION', body: (rowData) => rowData.newJobTitle || 'N/A' },
        { field: 'companyName', header: 'COMPANY PROFILE', body: (rowData) => rowData.companyName || 'N/A' },
        { field: 'address.firstName', header: 'USER WORK ADDRESS', body: (rowData) => rowData.address?.firstName || 'N/A' },
        { field: 'registeredOn', header: 'REGISTERED', body: (rowData) => rowData.registeredOn || 'N/A' },
        { field: 'lastLogin', header: 'LAST LOGIN', body: (rowData) => rowData.lastLogin || 'N/A' },
        {
            field: 'activeCheck', header: 'STATUS',
            body: (rowData) => (
                rowData.activeCheck === 'true' ?
                    <span><i className="fa fa-check"></i> Active</span> : <span><i className="fa fa-times"></i> Inactive</span>
            )
        }
    ];

    const [customers, setCustomers] = useState([]);
    const [lockedCustomers, setLockedCustomers] = useState([]);
    const [users, setUsers] = useState([]);


    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        const loadUsers = async () => {
            try {
                const result = await axios.get('http://localhost:3030/results');
                if (Array.isArray(result.data)) {
                    setUsers(result.data);
                    setIsLoading(false)
                } else {
                    console.error('API response is not an array:', result.data);
                }
            } catch (error) {
                console.error('Error loading users:', error);
            }
        };
        loadUsers();
    }, []);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const toast = useRef(null);

    const onRowSelect = (event) => {
        toast.current.show({ severity: 'info', summary: 'Product Selected', detail: `Name: ${event.data.name}`, life: 3000 });
    };

    const onRowUnselect = (event) => {
        toast.current.show({ severity: 'warn', summary: 'Product Unselected', detail: `Name: ${event.data.name}`, life: 3000 });
    };
    const lockTemplate = (rowData, options) => {
        const icon = options.frozenRow ? 'pi pi-lock' : 'pi pi-lock-open';
        const disabled = options.frozenRow ? false : lockedCustomers.length >= 2;

        ;
    };

    const toggleLock = (data, frozen, index) => {
        let _lockedCustomers, _unlockedCustomers;

        if (frozen) {
            _lockedCustomers = lockedCustomers.filter((c, i) => i !== index);
            _unlockedCustomers = [...users, data];
        } else {
            _unlockedCustomers = customers.filter((c, i) => i !== index);
            _lockedCustomers = [...lockedCustomers, data];
        }

        _unlockedCustomers.sort((val1, val2) => {
            return val1.id < val2.id ? -1 : 1;
        });

        setLockedCustomers(_lockedCustomers);
        setCustomers(_unlockedCustomers);
    };
    const [isOpen, setIsOpen] = useState(false);
    const handleUserFilter = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            <div className="layout2">
                <div className="layout2-left">
                    <span>All Users</span>
                    <span>Search</span>
                    <span><span>
                        <Filter onClick={handleUserFilter} />
                        {isOpen && <Filter_popup
                            handleClose={handleUserFilter}
                        />}
                    </span></span>
                </div>
                <div><span><Download/></span></div>
            </div>
            {isLoading ? <LoadingSpinner /> :
                <DataTable value={users} showGridlines value={users} frozenValue={lockedCustomers} scrollable scrollHeight="650px" paginator rows={25} rowsPerPageOptions={[25, 50, 100, 250]} tableStyle={{ minWidth: '50rem' }}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} selectionMode="single" selection={selectedProduct}>
                    {columns.map((col, i) => (
                        <Column
                            key={col.field}
                            field={col.field}
                            header={col.header}
                            body={col.body}
                        />
                    ))}

                </DataTable>
            }
        </>
    );
};
export default Users;