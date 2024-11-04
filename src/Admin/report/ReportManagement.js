import React, { useState } from 'react';
import ReportList from './ReportList';
import ReportDetail from './ReportDetail';

function ReportManagement() {
    const [selectedReport, setSelectedReport] = useState(null);

    const handleSelectReport = (report) => {
        setSelectedReport(report);
    };

    const handleCloseDetail = () => {
        setSelectedReport(null);
    };

    return (
        <div className="container">
            {selectedReport ? (
                <ReportDetail report={selectedReport} onClose={handleCloseDetail} />
            ) : (
                <ReportList onSelectReport={handleSelectReport} />
            )}
        </div>
    );
}

export default ReportManagement;
