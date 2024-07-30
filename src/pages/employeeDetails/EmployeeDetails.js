import 'rsuite/dist/rsuite.min.css';
import '../employeeDetails/EmployeeDetails.css';
import Header from '../../components/Header/Header';
import SideNav from '../../components/SideBar/SideNav';
import UserAvatar from '../../components/UserAvatar';
import Personal from '../../components/Personal/Personal';
import Employment from '../../components/Employment/Employment';
import Compensation from '../../components/Compensation/Compensation';
import BankDetails from '../../components/BankDetails/BankDetails';
import Address from '../../components/Address/Address';
import ContactDetails from '../../components/ContactDetails/ContactDetails';
import FamilyDetails from '../../components/FamilyDetails/FamilyDetails';
import WorkPermit from '../../components/WorkPermit/WorkPermit';
import { getData } from '../../service/api';
import { useLocation, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container, Content, Grid, Row, Col, FlexboxGrid, Divider, Text, Nav } from 'rsuite';

/**
 * EmployeeDetails Component
 * Displays detailed information about an employee (personal, employment, compensation details,...)
 * @component
 */
const EmployeeDetails = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState('personal');
  const [employeeData, setEmployeeData] = useState(null);
  const location = useLocation();
  const { employeeId } = useParams();

  /**
   * Toggles the sidebar expansion state.
   */
  const handleToggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  /**
   * Fetches employee data when the component mounts or the employee ID or
   * location pathname changes.
   */
  useEffect(() => {
    const getEmployeeData = () => {
      getData(`/person/get-latest/${employeeId}`)
        .then((data) => {
          setEmployeeData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (location.pathname === `/employees/${employeeId}`) {
      getEmployeeData(employeeId);
    }
  }, [location.pathname, employeeId]);

  /**
   * Renders the component based on the active tab key.
   * @returns {React.ReactNode}  corresponding component for the active tab.
   */
  const renderComponent = () => {
    switch (activeKey) {
      case 'personal':
        return <Personal employeeData={employeeData?.personal} />;
      case 'employment':
        return <Employment />;
      case 'compensation':
        return <Compensation />;
      case 'bank-details':
        return <BankDetails />;
      case 'address':
        return <Address />;
      case 'contact-details':
        return <ContactDetails />;
      case 'family-details':
        return <FamilyDetails />;
      case 'work-permit':
        return <WorkPermit />;
      default:
        return <Personal />;
    }
  };

  /**
   * Returns a display value if provided, otherwise returns a dash ('-').
   * @param {string | null | undefined} value - The value to be displayed.
   * @returns {string}  display value or a dash ('-') if the value is not provided.
   */
  const getDisplayValue = (value) => {
    return value ? value : '-';
  };

  return (
    <Container className="employee-details-container">
      <Header onToggleSidebar={handleToggleSidebar} />
      <Container className="employee-details-main-conatiner">
        <SideNav expand={isSidebarExpanded} />
        <Content>
          <Grid fluid>
            <Row>
              <h4 className="employee-name-header">
                {employeeData?.firstName} {employeeData?.lastName} ({employeeData?.employeeId})
              </h4>
            </Row>
            <Row>
              <FlexboxGrid className="employee-basic-details-grid" justify="space-around">
                <FlexboxGrid.Item colspan={20}>
                  <FlexboxGrid justify="space-between">
                    <Col xs={3}>
                      <div className="header-field">
                        <Text weight="medium">Status</Text>
                        <Text size="lg" weight="semibold">
                          {getDisplayValue(employeeData?.status)}
                        </Text>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="header-field">
                        <Text weight="medium">Designation</Text>
                        <Text size="lg" weight="semibold">
                          {getDisplayValue(employeeData?.designation)}
                        </Text>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="header-field">
                        <Text weight="medium">Reports to</Text>
                        <Text size="lg" weight="semibold">
                          {getDisplayValue(employeeData?.reportsTo)}
                        </Text>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="header-field">
                        <Text weight="medium">Email</Text>
                        <Text size="lg" weight="semibold">
                          {getDisplayValue(employeeData?.email)}
                        </Text>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="header-field">
                        <Text weight="medium">Number</Text>
                        <Text size="lg" weight="semibold">
                          {getDisplayValue(employeeData?.number)}
                        </Text>
                      </div>
                    </Col>
                  </FlexboxGrid>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={3}>
                  <UserAvatar
                    firstName={employeeData?.firstName}
                    lastName={employeeData?.lastName}
                    width="4rem"
                    height="4rem"
                  />
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Row>
            <Divider className="header-divider" />
            <Nav
              className="employee-details-nav"
              activeKey={activeKey}
              appearance="subtle"
              onSelect={setActiveKey}
              defaultActiveKey="personal"
            >
              <Nav.Item eventKey="personal">Personal</Nav.Item>
              <Nav.Item eventKey="employment">Employment</Nav.Item>
              <Nav.Item eventKey="compensation">Compensation</Nav.Item>
              <Nav.Item eventKey="bank-details">Bank details</Nav.Item>
              <Nav.Item eventKey="address">Address</Nav.Item>
              <Nav.Item eventKey="contact-details">Contact details</Nav.Item>
              <Nav.Item eventKey="family-details">Family details</Nav.Item>
              <Nav.Item eventKey="work-permit">Work permit</Nav.Item>
            </Nav>
            <Row className="nav-component">{renderComponent()}</Row>
          </Grid>
        </Content>
      </Container>
    </Container>
  );
};

export default EmployeeDetails;
