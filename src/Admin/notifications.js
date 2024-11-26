import React, { useState } from 'react';
import { Button, Table, Pagination, Modal, Form } from 'react-bootstrap';

function Notifications() {
    const [notifications, setNotifications] = useState([
        { id: 1, Notification_recipient: 101, Notification_sender: 201, Status: 'Unread', Content: 'Bạn có thông báo mới' },
        { id: 2, Notification_recipient: 102, Notification_sender: 202, Status: 'Read', Content: 'Bạn đã nhận được một tin nhắn' },
        { id: 3, Notification_recipient: 103, Notification_sender: 203, Status: 'Unread', Content: 'Thông báo hệ thống' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'add' | 'edit' | 'view'
    const [currentNotification, setCurrentNotification] = useState(null);
    const notificationsPerPage = 5;

    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);
    const totalPages = Math.ceil(notifications.length / notificationsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleModalClose = () => {
        setShowModal(false);
        setCurrentNotification(null);
    };

    const handleShowModal = (type, notification = null) => {
        setModalType(type);
        setCurrentNotification(notification);
        setShowModal(true);
    };

    const handleSaveNotification = () => {
        if (modalType === 'add') {
            setNotifications([...notifications, { id: notifications.length + 1, ...currentNotification }]);
        } else if (modalType === 'edit') {
            setNotifications(notifications.map(notification =>
                notification.id === currentNotification.id ? currentNotification : notification
            ));
        }
        handleModalClose();
    };

    const handleDeleteNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center text-uppercase mb-4">Quản lý Thông báo</h1>
            <Button className="mb-3" onClick={() => handleShowModal('add')}>Thêm mới Thông báo</Button>
            <Table striped bordered hover style={{ fontSize: '17px' }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Người nhận</th>
                    <th>Người gửi</th>
                    <th>Trạng thái</th>
                    <th>Nội dung</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {currentNotifications.map(notification => (
                    <tr key={notification.id}>
                        <td>{notification.id}</td>
                        <td>{notification.Notification_recipient}</td>
                        <td>{notification.Notification_sender}</td>
                        <td>{notification.Status}</td>
                        <td>{notification.Content}</td>
                        <td>
                            <Button variant="info" onClick={() => handleShowModal('view', notification)}>Xem</Button>{' '}
                            <Button variant="warning" onClick={() => handleShowModal('edit', notification)}>Sửa</Button>{' '}
                            <Button variant="danger" onClick={() => handleDeleteNotification(notification.id)}>Xóa</Button>
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
                    <Modal.Title>{modalType === 'add' ? 'Thêm mới Thông báo' : modalType === 'edit' ? 'Chỉnh sửa Thông báo' : 'Xem chi tiết Thông báo'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalType === 'view' ? (
                        <>
                            <p><strong>Người nhận:</strong> {currentNotification?.Notification_recipient}</p>
                            <p><strong>Người gửi:</strong> {currentNotification?.Notification_sender}</p>
                            <p><strong>Trạng thái:</strong> {currentNotification?.Status}</p>
                            <p><strong>Nội dung:</strong> {currentNotification?.Content}</p>
                        </>
                    ) : (
                        <Form>
                            <Form.Group>
                                <Form.Label>Người nhận (ID)</Form.Label>
                                <Form.Control
                                    type="number"
                                    defaultValue={currentNotification?.Notification_recipient || ''}
                                    onChange={(e) => setCurrentNotification({ ...currentNotification, Notification_recipient: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Người gửi (ID)</Form.Label>
                                <Form.Control
                                    type="number"
                                    defaultValue={currentNotification?.Notification_sender || ''}
                                    onChange={(e) => setCurrentNotification({ ...currentNotification, Notification_sender: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Trạng thái</Form.Label>
                                <Form.Control
                                    as="select"
                                    defaultValue={currentNotification?.Status || 'Unread'}
                                    onChange={(e) => setCurrentNotification({ ...currentNotification, Status: e.target.value })}
                                >
                                    <option value="Unread">Unread</option>
                                    <option value="Read">Read</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nội dung</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    defaultValue={currentNotification?.Content || ''}
                                    onChange={(e) => setCurrentNotification({ ...currentNotification, Content: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                {modalType !== 'view' && (
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>Hủy</Button>
                        <Button variant="primary" onClick={handleSaveNotification}>Lưu</Button>
                    </Modal.Footer>
                )}
            </Modal>
        </div>
    );
}

export default Notifications;
