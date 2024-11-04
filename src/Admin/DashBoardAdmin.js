import React, {useContext, useEffect} from 'react';
import {NavLink, Outlet} from "react-router-dom";
import './DashBoardAdmin.css';

function DashBoardAdmin() {
    return (
        <div className="dashboard">
            <nav className="dashboard__nav">
                <h2 className="dashboard__title">Trang Quản Lý ADMIN</h2>
                <ul className="dashboard__nav-list">
                    <li className="dashboard__nav-item">
                        <NavLink
                            to="/admin/accounts"
                            className="dashboard__nav-link"
                            activeClassName="active"
                        >
                            Quản lý tài khoản
                        </NavLink>
                    </li>
                    <li className="dashboard__nav-item">
                        <NavLink
                            to="/admin/reports"
                            className="dashboard__nav-link"
                            activeClassName="active"
                        >
                            Quản lý báo cáo
                        </NavLink>
                    </li>
                    <li className="dashboard__nav-item">
                        <NavLink
                            to="/admin/comments"
                            className="dashboard__nav-link"
                            activeClassName="active"
                        >
                            Quản lý bình luận
                        </NavLink>
                    </li>
                    <li className="dashboard__nav-item">
                        <NavLink
                            to="/admin/categories"
                            className="dashboard__nav-link"
                            activeClassName="active"
                        >
                            Quản lý danh mục
                        </NavLink>
                    </li>
                    <li className="dashboard__nav-item">
                        <NavLink
                            to="/admin/noti"
                            className="dashboard__nav-link"
                            activeClassName="active"
                        >
                            Quản lý thông báo
                        </NavLink>
                    </li>

                </ul>
            </nav>
            <main className="dashboard__content">
                <Outlet/>
            </main>
        </div>
    );
}

export default DashBoardAdmin;
