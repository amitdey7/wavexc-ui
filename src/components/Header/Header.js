import React from 'react';
import { Header, Navbar, Nav } from 'rsuite';
import './Header.css';
import LogoWhite from '../../assets/LogoWhite';
import { Icon } from '@rsuite/icons';
import { FaBell, FaChevronDown, FaBars } from 'react-icons/fa6';
import UserAvatar from '../../components/UserAvatar';

const HeaderComponent = ({ onToggleSidebar }) => {
  return (
    <Header>
      <Navbar className="header-bar">
        <Nav>
          <Nav.Item
            icon={<FaBars />}
            onClick={onToggleSidebar}
            className="sidebar-toggle-button"
          ></Nav.Item>
          <Nav.Item className="header-bar-logo">
            <LogoWhite width="5rem" height="3rem" />
          </Nav.Item>
        </Nav>
        <Nav pullRight>
          <div className="header-right-content">
            <div className="notification-icon">
              <Icon as={FaBell} />
            </div>
            <div className="profile">
              <div className="profile-card">
                <UserAvatar firstName="Shiva" lastName="Kumar" width="2.1rem" height="2.1rem" />
                <div className="profile-details">
                  <span className="profile-name">Shiva Kumar</span>
                  <span className="profile-role">Payroll Admin</span>
                </div>
                <Icon as={FaChevronDown} className="profile-dropdown-icon" />
              </div>
            </div>
          </div>
        </Nav>
      </Navbar>
    </Header>
  );
};

export default HeaderComponent;
