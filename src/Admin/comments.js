import React, { useState } from 'react';
import { Button, Table, Pagination } from 'react-bootstrap';

function Comments() {
    const [comments, setComments] = useState([
        { id: 1, Created_by: 101, Blog_id: 201, content: 'Great post!', Is_activated: 1 },
        { id: 2, Created_by: 102, Blog_id: 202, content: 'Interesting perspective.', Is_activated: 0 },
        { id: 3, Created_by: 103, Blog_id: 203, content: 'I learned a lot.', Is_activated: 1 },
        { id: 4, Created_by: 104, Blog_id: 204, content: 'Nice read!', Is_activated: 0 },
        { id: 5, Created_by: 105, Blog_id: 205, content: 'Thanks for sharing!', Is_activated: 1 },
        { id: 6, Created_by: 106, Blog_id: 206, content: 'Very insightful.', Is_activated: 1 },
        { id: 7, Created_by: 107, Blog_id: 207, content: 'Well explained!', Is_activated: 0 },
        { id: 8, Created_by: 108, Blog_id: 208, content: 'Helpful post.', Is_activated: 1 },
        { id: 9, Created_by: 109, Blog_id: 209, content: 'Thank you!', Is_activated: 0 },
        { id: 10, Created_by: 110, Blog_id: 210, content: 'Great advice!', Is_activated: 1 },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;

    // Calculate the current comments to display based on the page
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    // Handle page change
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const toggleActivation = (id, currentStatus) => {
        const newStatus = currentStatus === 1 ? 0 : 1;
        setComments(comments.map(comment =>
            comment.id === id ? { ...comment, Is_activated: newStatus } : comment
        ));
    };

    // Calculate total pages for pagination
    const totalPages = Math.ceil(comments.length / commentsPerPage);

    return (
        <div className="container mt-5">
            <h1 className="text-center text-uppercase mb-4">Danh sách bình luận</h1>
            <Table striped bordered hover style={{ fontSize: '17px' }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Created By</th>
                    <th>Blog ID</th>
                    <th>Content</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {currentComments.map(comment => (
                    <tr key={comment.id}>
                        <td>{comment.id}</td>
                        <td>{comment.Created_by}</td>
                        <td>{comment.Blog_id}</td>
                        <td>{comment.content}</td>
                        <td>{comment.Is_activated === 1 ? 'Active' : 'Inactive'}</td>
                        <td className="text-center">
                            <Button
                                variant={comment.Is_activated === 1 ? 'danger' : 'success'}
                                onClick={() => toggleActivation(comment.id, comment.Is_activated)}
                            >
                                {comment.Is_activated === 1 ? 'Block' : 'Activate'}
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

export default Comments;
