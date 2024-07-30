import { useState, useEffect } from 'react';
import 'rsuite/dist/rsuite.min.css';
import { Nav, Sidenav } from 'rsuite/';
import { FaBuildingColumns, FaHandHoldingDollar, FaBriefcase, FaUsers } from 'react-icons/fa6';
import { Icon } from '@rsuite/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import './SideNav.css';

const Sidebar = ({ expand }) => {
  const [activeKey, setActiveKey] = useState('1');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes('/employees')) {
      setActiveKey('employees');
    } else if (location.pathname.includes('/payroll')) {
      setActiveKey('payroll');
    } else if (location.pathname.includes('/posting')) {
      setActiveKey('posting');
    } else if (location.pathname.includes('/bank')) {
      setActiveKey('bank');
    } else {
      setActiveKey('');
    }
  }, [location.pathname]);

  const handleSelect = (eventKey) => {
    setActiveKey(eventKey);
    navigate(`/${eventKey}`);
  };

  return (
    <div className="sidenav-container">
      <Sidenav expanded={expand} className="sidenav">
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={handleSelect}>
            <Nav.Item eventKey="employees" icon={<Icon as={FaUsers} />}>
              Employees
            </Nav.Item>
            <Nav.Item eventKey="payroll" icon={<Icon as={FaHandHoldingDollar} />}>
              Payroll
            </Nav.Item>
            <Nav.Item eventKey="posting" icon={<Icon as={FaBriefcase} />}>
              Posting
            </Nav.Item>
            <Nav.Item eventKey="bank" icon={<Icon as={FaBuildingColumns} />}>
              Bank
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default Sidebar;
