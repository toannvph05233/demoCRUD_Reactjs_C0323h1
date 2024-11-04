import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import './ReportDetail.css';


function ReportDetail({ report, onClose }) {
    if (!report) return null;

    const renderReportTypeDetails = () => {
        switch (report.reportTypeId) {
            case 1:
                return (
                    <ListGroup.Item>
                        <strong>Account ID:</strong> {report.accountId}
                        {/* Add other Account report-specific details */}
                    </ListGroup.Item>
                );
            case 2:
                return (
                    <ListGroup.Item>
                        <strong>Blog ID:</strong> {report.blogId}
                        {/* Add other Blog report-specific details */}
                    </ListGroup.Item>
                );
            case 3:
                return (
                    <ListGroup.Item>
                        <strong>Comment ID:</strong> {report.commentId}
                        {/* Add other Comment report-specific details */}
                    </ListGroup.Item>
                );
            case 4:
                return (
                    <ListGroup.Item>
                        <strong>Tour ID:</strong> {report.tourId}
                        {/* Add other Tour report-specific details */}
                    </ListGroup.Item>
                );
            case 5:
                return (
                    <ListGroup.Item>
                        <strong>Location ID:</strong> {report.locationId}
                        {/* Add other Location report-specific details */}
                    </ListGroup.Item>
                );
            default:
                return <ListGroup.Item>No additional details available for this report type.</ListGroup.Item>;
        }
    };

    return (
        <div className="container mt-5" style={{width:700}}>
            <Card className="shadow-lg">
                <Card.Header className="bg-primary text-white">
                    <h3 className="mb-0">Chi tiết báo cáo</h3>
                </Card.Header>
                <Card.Body>
                    <h5>General Information</h5>
                    <ListGroup variant="flush" className="mb-4">
                        <ListGroup.Item>
                            <strong>ID:</strong> {report.id}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Name:</strong> {report.name}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Description:</strong> {report.description}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Report Type:</strong> {report.reportType}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Created By:</strong> {report.createdBy}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Create Date:</strong> {report.createDate}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Approved:</strong> {report.approved ? 'Yes' : 'No'}
                        </ListGroup.Item>
                    </ListGroup>

                    <h5>Type-Specific Details</h5>
                    <ListGroup variant="flush">
                        {renderReportTypeDetails()}
                    </ListGroup>
                </Card.Body>
                <Card.Footer className="text-right">
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default ReportDetail;
