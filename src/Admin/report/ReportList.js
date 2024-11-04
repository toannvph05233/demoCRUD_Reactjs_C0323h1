import React, { useState } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';

function ReportList({ onSelectReport }) {
    const [itemsPerPage, setItemsPerPage] = useState(4); // Number of items per page

    const reports = [
        { id: 1, name: 'Spam Report', description: 'Spam content report', reportType: 'Comment Report', reportTypeId: 3, createdBy: 101, createDate: '2024-11-01', approved: true },
        { id: 2, name: 'Inappropriate Content', description: 'Inappropriate blog content', reportType: 'Blog Report', reportTypeId: 4, createdBy: 102, createDate: '2024-10-28', approved: false },
        // More reports...
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 5;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const currentReports = reports.slice(
        (currentPage - 1) * reportsPerPage,
        currentPage * reportsPerPage
    );
    // Calculate total pages
    const totalPages = Math.ceil(reports.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-5">
            <h1 className="text-center text-uppercase mb-4">Danh sách báo cáo</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Report Type</th>
                    <th>Created By</th>
                    <th>Create Date</th>
                    <th>Approved</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                {currentReports.map(report => (
                    <tr key={report.id}>
                        <td>{report.id}</td>
                        <td>{report.name}</td>
                        <td>{report.reportType}</td>
                        <td>{report.createdBy}</td>
                        <td>{report.createDate}</td>
                        <td>{report.approved ? 'Yes' : 'No'}</td>
                        <td>
                            <Button variant="info" onClick={() => onSelectReport(report)}>View Details</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
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

export default ReportList;
