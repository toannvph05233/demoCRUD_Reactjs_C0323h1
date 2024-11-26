import React, { useState } from 'react';
import { Button, Table, Pagination, Modal, Form } from 'react-bootstrap';

function Tours() {
    const [tours, setTours] = useState([
        { id: 1, Title: 'Tour Hà Nội', Decription: 'Khám phá thủ đô', Start_date: '2024-12-01', End_date: '2024-12-05', Quantity_member: 10, Expense: 500.0, AllowedToApply: true },
        { id: 2, Title: 'Tour Sapa', Decription: 'Vẻ đẹp vùng núi', Start_date: '2024-12-10', End_date: '2024-12-15', Quantity_member: 15, Expense: 700.0, AllowedToApply: false },
        { id: 3, Title: 'Tour Đà Nẵng', Decription: 'Khám phá miền Trung', Start_date: '2024-12-20', End_date: '2024-12-25', Quantity_member: 20, Expense: 800.0, AllowedToApply: true },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'add' | 'edit' | 'view'
    const [currentTour, setCurrentTour] = useState(null);
    const toursPerPage = 5;

    const indexOfLastTour = currentPage * toursPerPage;
    const indexOfFirstTour = indexOfLastTour - toursPerPage;
    const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);
    const totalPages = Math.ceil(tours.length / toursPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleModalClose = () => {
        setShowModal(false);
        setCurrentTour(null);
    };

    const handleShowModal = (type, tour = null) => {
        setModalType(type);
        setCurrentTour(tour);
        setShowModal(true);
    };

    const handleSaveTour = () => {
        if (modalType === 'add') {
            setTours([...tours, { id: tours.length + 1, ...currentTour }]);
        } else if (modalType === 'edit') {
            setTours(tours.map(tour => (tour.id === currentTour.id ? currentTour : tour)));
        }
        handleModalClose();
    };

    const handleDeleteTour = (id) => {
        setTours(tours.filter(tour => tour.id !== id));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center text-uppercase mb-4">Quản lý Tour</h1>
            <Button className="mb-3" onClick={() => handleShowModal('add')}>Thêm mới Tour</Button>
            <Table striped bordered hover style={{ fontSize: '17px' }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tiêu đề</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Thành viên</th>
                    <th>Chi phí</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {currentTours.map(tour => (
                    <tr key={tour.id}>
                        <td>{tour.id}</td>
                        <td>{tour.Title}</td>
                        <td>{tour.Start_date}</td>
                        <td>{tour.End_date}</td>
                        <td>{tour.Quantity_member}</td>
                        <td>${tour.Expense.toFixed(2)}</td>
                        <td>{tour.AllowedToApply ? 'Cho phép' : 'Không cho phép'}</td>
                        <td>
                            <Button variant="info" onClick={() => handleShowModal('view', tour)}>Xem</Button>{' '}
                            <Button variant="warning" onClick={() => handleShowModal('edit', tour)}>Sửa</Button>{' '}
                            <Button variant="danger" onClick={() => handleDeleteTour(tour.id)}>Xóa</Button>
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
                    <Modal.Title>{modalType === 'add' ? 'Thêm mới Tour' : modalType === 'edit' ? 'Chỉnh sửa Tour' : 'Xem chi tiết Tour'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalType === 'view' ? (
                        <>
                            <p><strong>Tiêu đề:</strong> {currentTour?.Title}</p>
                            <p><strong>Mô tả:</strong> {currentTour?.Decription}</p>
                            <p><strong>Ngày bắt đầu:</strong> {currentTour?.Start_date}</p>
                            <p><strong>Ngày kết thúc:</strong> {currentTour?.End_date}</p>
                            <p><strong>Thành viên:</strong> {currentTour?.Quantity_member}</p>
                            <p><strong>Chi phí:</strong> ${currentTour?.Expense.toFixed(2)}</p>
                            <p><strong>Trạng thái:</strong> {currentTour?.AllowedToApply ? 'Cho phép' : 'Không cho phép'}</p>
                        </>
                    ) : (
                        <Form>
                            <Form.Group>
                                <Form.Label>Tiêu đề</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={currentTour?.Title || ''}
                                    onChange={(e) => setCurrentTour({ ...currentTour, Title: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    defaultValue={currentTour?.Decription || ''}
                                    onChange={(e) => setCurrentTour({ ...currentTour, Decription: e.target.value })}
                                />
                            </Form.Group>
                            {/* Các trường dữ liệu khác tương tự */}
                        </Form>
                    )}
                </Modal.Body>
                {modalType !== 'view' && (
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>Hủy</Button>
                        <Button variant="primary" onClick={handleSaveTour}>Lưu</Button>
                    </Modal.Footer>
                )}
            </Modal>
        </div>
    );
}

export default Tours;
