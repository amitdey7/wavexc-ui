import 'rsuite/dist/rsuite.min.css';
import '../employees/Employee.css';
import Header from '../../components/Header/Header';
import SideNav from '../../components/SideBar/SideNav';
import React, { useState, useEffect } from 'react';
import { getData } from '../../service/api';
import { format } from 'date-fns';
import UserAvatar from '../../components/UserAvatar';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@rsuite/icons/Search';
import { FaUpload, FaDownload, FaFileExcel, FaArrowRotateRight } from 'react-icons/fa6';
import {
  Container,
  InputGroup,
  Content,
  Input,
  Button,
  Table,
  Grid,
  Row,
  Col,
  ButtonToolbar,
  Pagination,
  IconButton,
  Divider,
} from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

/**
 * Employees component - displays a list of employees with various statistics.
 * @component
 */
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Fetches employee data and updates the state.
   */
  const getEmployeesData = () => {
    getData('/person/get-all-latest')
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Handles the sidebar toggle.
   */
  const handleToggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  /**
   * Handles row clicks on the employee table.
   * Navigates to the employee's detail page.
   * @param {string} employeeId - employee ID
   */
  const onEmployeeRowClcik = (employeeId) => {
    navigate(`/employees/${employeeId}`);
  };

  useEffect(() => {
    if (location.pathname === '/employees') {
      getEmployeesData();
    }
  }, [location.pathname]);

  return (
    <Container className="employee-container">
      <Header onToggleSidebar={handleToggleSidebar} />
      <Container className="employee-main-conatiner">
        <SideNav expand={isSidebarExpanded} />
        <Content>
          <Grid fluid>
            <Row className="stat-grid">
              <Col xs={6}>
                <div className="stat-card">
                  <p className="stat-title">Newly Hired People</p>
                  <div className="stat-value">
                    <span className="stat-number">10</span>
                    <span className="stat-percentage">+5%</span>
                  </div>
                </div>
              </Col>
              <Col xs={6}>
                <div className="stat-card">
                  <p className="stat-title">Active People</p>
                  <div className="stat-value">
                    <span className="stat-number">251</span>
                    <span className="stat-percentage">+5%</span>
                  </div>
                </div>
              </Col>
              <Col xs={6}>
                <div className="stat-card">
                  <p className="stat-title">New Hires</p>
                  <div className="stat-value">
                    <span className="stat-number">19</span>
                    <span className="stat-percentage">+5%</span>
                  </div>
                </div>
              </Col>
              <Col xs={6}>
                <div className="stat-card">
                  <p className="stat-title">Salary range of employees</p>
                  <div className="stat-value">
                    <span className="stat-number">10</span>
                    <span className="stat-percentage">+5%</span>
                  </div>
                </div>
              </Col>
            </Row>
            <Col xs={24} className="employee-table-container">
              <div className="employee-table-header">
                <div className="employee-table-title">
                  Employees ({employees.length})
                  <IconButton icon={<FaArrowRotateRight />} onClick={getEmployeesData} size="xs" />
                </div>
                <div className="employee-table-header-rigth-content">
                  <ButtonToolbar className="employee-table-button-Group">
                    <Button appearance="primary" size="xs" startIcon={<FaUpload />}>
                      Full Upload
                    </Button>
                    <Button appearance="ghost" size="xs" startIcon={<FaDownload />}>
                      Download File
                    </Button>
                    <Button appearance="ghost" size="xs" startIcon={<FaFileExcel />}>
                      Download Template
                    </Button>
                  </ButtonToolbar>
                  <Divider vertical className="employee-table-divider" />
                  <InputGroup size="xs" className="employee-table-search">
                    <Input placeholder="Search by Employee name & ID" />
                    <InputGroup.Button>
                      <SearchIcon />
                    </InputGroup.Button>
                  </InputGroup>
                </div>
              </div>
              <Table
                data={employees}
                fillHeight
                className="employee-table"
                onRowClick={(rowData) => onEmployeeRowClcik(rowData.employeeId)}
              >
                <Column width={70} align="center" className="employee-profile-photo-column">
                  <HeaderCell></HeaderCell>
                  <Cell>
                    {(rowData) => (
                      <UserAvatar
                        firstName={rowData.firstName}
                        lastName={rowData.lastName}
                        width="2rem"
                        height="2rem"
                      />
                    )}
                  </Cell>
                </Column>
                <Column flexGrow={1} align="center" sortable>
                  <HeaderCell>Full Name</HeaderCell>
                  <Cell>{(rowData) => rowData.firstName + ' ' + rowData.lastName}</Cell>
                </Column>
                <Column flexGrow={1} align="center" sortable>
                  <HeaderCell>Employee Id</HeaderCell>
                  <Cell dataKey="employeeId" />
                </Column>
                <Column flexGrow={1} align="center">
                  <HeaderCell>Hire Date</HeaderCell>
                  <Cell>
                    {(rowData) => {
                      const date = new Date(rowData.hireDate);
                      return format(date, 'MMM dd, yyyy');
                    }}
                  </Cell>
                </Column>
                <Column flexGrow={1} align="center">
                  <HeaderCell>Event</HeaderCell>
                  <Cell dataKey="eventTypeDesc" />
                </Column>
                <Column flexGrow={1} align="center">
                  <HeaderCell>Position</HeaderCell>
                  <Cell dataKey="position"></Cell>
                </Column>
                <Column flexGrow={1} align="center">
                  <HeaderCell>Net Salary</HeaderCell>
                  <Cell> $5000</Cell>
                </Column>
              </Table>
              <Pagination
                className="employee-table-pagination"
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButtons={5}
                size="xs"
                layout={['pager']}
                total={employees.length}
                activePage={page}
                onChangePage={setPage}
                limit={10}
              />
            </Col>
          </Grid>
        </Content>
      </Container>
    </Container>
  );
};

export default Employees;
