import React, { useState } from 'react';
import { Button, Table, Pagination, Modal, Form } from 'react-bootstrap';

function Blogs() {
    const [blogs, setBlogs] = useState([
        { id: 1, Created_by: 101, Created_at: '2024-11-25 10:00:00', Is_activated: true, Decription: 'Bài viết về Hà Nội', Tour_id: 1 },
        { id: 2, Created_by: 102, Created_at: '2024-11-26 12:00:00', Is_activated: false, Decription: 'Chia sẻ về Sapa', Tour_id: 2 },
        { id: 3, Created_by: 103, Created_at: '2024-11-27 14:00:00', Is_activated: true, Decription: 'Đánh giá về Đà Nẵng', Tour_id: 3 },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'add' | 'edit' | 'view'
    const [currentBlog, setCurrentBlog] = useState(null);
    const blogsPerPage = 5;

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleModalClose = () => {
        setShowModal(false);
        setCurrentBlog(null);
    };

    const handleShowModal = (type, blog = null) => {
        setModalType(type);
        setCurrentBlog(blog);
        setShowModal(true);
    };

    const handleSaveBlog = () => {
        if (modalType === 'add') {
            setBlogs([...blogs, { id: blogs.length + 1, ...currentBlog }]);
        } else if (modalType === 'edit') {
            setBlogs(blogs.map(blog => (blog.id === currentBlog.id ? currentBlog : blog)));
        }
        handleModalClose();
    };

    const handleDeleteBlog = (id) => {
        setBlogs(blogs.filter(blog => blog.id !== id));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center text-uppercase mb-4">Quản lý Blog</h1>
            <Button className="mb-3" onClick={() => handleShowModal('add')}>Thêm mới Blog</Button>
            <Table striped bordered hover style={{ fontSize: '17px' }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Người tạo</th>
                    <th>Ngày tạo</th>
                    <th>Mô tả</th>
                    <th>Tour liên quan</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {currentBlogs.map(blog => (
                    <tr key={blog.id}>
                        <td>{blog.id}</td>
                        <td>{blog.Created_by}</td>
                        <td>{blog.Created_at}</td>
                        <td>{blog.Decription}</td>
                        <td>{blog.Tour_id || 'Không có'}</td>
                        <td>{blog.Is_activated ? 'Đã kích hoạt' : 'Chưa kích hoạt'}</td>
                        <td>
                            <Button variant="info" onClick={() => handleShowModal('view', blog)}>Xem</Button>{' '}
                            <Button variant="warning" onClick={() => handleShowModal('edit', blog)}>Sửa</Button>{' '}
                            <Button variant="danger" onClick={() => handleDeleteBlog(blog.id)}>Xóa</Button>
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

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalType === 'add' ? 'Thêm mới Blog' : modalType === 'edit' ? 'Chỉnh sửa Blog' : 'Xem chi tiết Blog'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalType === 'view' ? (
                        <>
                            <p><strong>Người tạo:</strong> {currentBlog?.Created_by}</p>
                            <p><strong>Ngày tạo:</strong> {currentBlog?.Created_at}</p>
                            <p><strong>Mô tả:</strong> {currentBlog?.Decription}</p>
                            <p><strong>Tour liên quan:</strong> {currentBlog?.Tour_id || 'Không có'}</p>
                            <p><strong>Trạng thái:</strong> {currentBlog?.Is_activated ? 'Đã kích hoạt' : 'Chưa kích hoạt'}</p>
                        </>
                    ) : (
                        <Form>
                            <Form.Group>
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    defaultValue={currentBlog?.Decription || ''}
                                    onChange={(e) => setCurrentBlog({ ...currentBlog, Decription: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Tour liên quan (ID)</Form.Label>
                                <Form.Control
                                    type="number"
                                    defaultValue={currentBlog?.Tour_id || ''}
                                    onChange={(e) => setCurrentBlog({ ...currentBlog, Tour_id: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    label="Kích hoạt"
                                    checked={currentBlog?.Is_activated || false}
                                    onChange={(e) => setCurrentBlog({ ...currentBlog, Is_activated: e.target.checked })}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                {modalType !== 'view' && (
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>Hủy</Button>
                        <Button variant="primary" onClick={handleSaveBlog}>Lưu</Button>
                    </Modal.Footer>
                )}
            </Modal>
        </div>
    );
}

export default Blogs;
