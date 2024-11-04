import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Table, Button, Pagination} from 'react-bootstrap';

function Accounts() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4); // Number of items per page

    // const [accounts, setAccounts] = useState([]);
    //
    // useEffect(() => {
    //     getAll();
    // }, []);
    //
    // const getAll = () => {
    //     axios.get('http://localhost:8080/api/admin')
    //         .then(response => {
    //             setAccounts(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching accounts:', error);
    //         });
    // }
    //
    // const toggleStatus = (accountId) => {
    //     axios.post(`http://localhost:8080/api/admin/${accountId}`,)
    //         .then(response => {
    //             console.log(response)
    //             getAll();
    //         })
    //         .catch(error => {
    //             console.error('Error toggling account status:', error);
    //         });
    // };

    const accounts = [
        { id: 1, username: 'john_doe', email: 'john.doe@example.com', status: 'active' },
        { id: 2, username: 'jane_smith', email: 'jane.smith@example.com', status: 'inactive' },
        { id: 3, username: 'bob_brown', email: 'bob.brown@example.com', status: 'active' },
        { id: 4, username: 'alice_jones', email: 'alice.jones@example.com', status: 'inactive' },
        { id: 5, username: 'michael_green', email: 'michael.green@example.com', status: 'active' },
    ];

    // Calculate total pages
    const totalPages = Math.ceil(accounts.length / itemsPerPage);

    // Get current accounts to display
    const indexOfLastAccount = currentPage * itemsPerPage;
    const indexOfFirstAccount = indexOfLastAccount - itemsPerPage;
    const currentAccounts = accounts.slice(indexOfFirstAccount, indexOfLastAccount);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center text-uppercase mb-4">Danh sách tài khoản</h1>
            <Table striped bordered hover style={{ fontSize: '17px' }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {currentAccounts.map(account => (
                    <tr key={account.id}>
                        <td>{account.id}</td>
                        <td>{account.username}</td>
                        <td>{account.email}</td>
                        <td>{account.status}</td>
                        <td className="text-center">
                            <Button variant={account.status === 'active' ? 'danger' : 'success'}>
                                {account.status === 'active' ? 'Block' : 'Activate'}
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {/* Pagination Controls */}
            <Pagination className="justify-content-center mt-4">
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </div>
    );
}

export default Accounts;
