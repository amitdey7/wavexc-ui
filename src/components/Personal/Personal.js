import './Personal.css';
import React, { useState, useEffect, useCallback } from 'react';
import { FaPen, FaFloppyDisk, FaTrash, FaPlus, FaXmark } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { getData, postData } from '../../service/api';
import { toast } from 'react-toastify';
import { formatDateToISOString } from '../../util/helper';
import {
  SALUTATIONS,
  GENDERS,
  MARITAL_STATUSES,
  NATIONAL_ID_CARD_TYPES,
} from '../../util/constants';
import {
  Panel,
  Button,
  Table,
  Stack,
  Col,
  Grid,
  Form,
  SelectPicker,
  Row,
  DatePicker,
  Input,
  Toggle,
  ButtonToolbar,
} from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

/**
 * Personal component displays and manages personal details and identity information for an employee.
 * This component allows managing of personal details and employee identity information details.
 * @param {Object} props.employeeData - employee data to populate the personal details
 */
const Personal = ({ employeeData }) => {
  const { employeeId } = useParams();
  const [personalDetails, setPersonalDetails] = useState({
    salutation: employeeData?.salutation || '',
    firstName: employeeData?.firstName || '',
    middleName: employeeData?.middleName || '',
    lastName: employeeData?.lastName || '',
    birthName: employeeData?.birthName || '',
    dateOfBirth: employeeData?.dateOfBirth || '',
    gender: employeeData?.gender || '',
    placeOfBirth: employeeData?.placeOfBirth || '',
    countryOfBirth: employeeData?.countryOfBirth || '',
    maritalStatus: employeeData?.maritalStatus || '',
    nationality: employeeData?.nationality || '',
  });
  const [employeeIdentityData, setEmployeeIdentityData] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(true);

  /**
   * Fetches the latest personal details of employee and updates state.
   */
  const getEmployeePersonalData = useCallback(() => {
    getData(`/person/get-latest/${employeeId}`)
      .then((data) => {
        setPersonalDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [employeeId]);

  /**
   * Fetches the identity details of the employee and updates state.
   */
  const getEmployeeIdentity = useCallback(() => {
    getData(`/identity/${employeeId}`)
      .then((data) => {
        setEmployeeIdentityData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [employeeId]);

  useEffect(() => {
    if (!employeeData) {
      getEmployeePersonalData();
    } else {
      setPersonalDetails(employeeData);
    }
    getEmployeeIdentity();
  }, [employeeId, employeeData, getEmployeeIdentity, getEmployeePersonalData]);
  /**
   * Enables editing mode for personal details.
   */
  const onPersonalDetailsEditClick = () => {
    setIsReadOnly(false);
  };

  /**
   * Handles on Save personal details.
   */
  const onPersonalDetailsSave = () => {
    setIsReadOnly(true);

    const employeeData = {
      employeeId,
      salutation: personalDetails.salutation,
      firstName: personalDetails.firstName,
      middleName: personalDetails.middleName,
      lastName: personalDetails.lastName,
      birthName: personalDetails.birthName,
      gender: personalDetails.gender,
      dateOfBirth: formatDateToISOString(personalDetails?.dateOfBirth),
      placeOfBirth: personalDetails.placeOfBirth,
      countryOfBirth: personalDetails.countryOfBirth,
      maritalStatus: personalDetails.maritalStatus,
      nationality: personalDetails.nationality,
    };
    postData('/person/data-correction', employeeData)
      .then((response) => {
        setPersonalDetails(response);
        toast.success('Personal Details saved successfully');
      })
      .catch((error) => {
        const { message } = error?.response?.data;
      });
  };

  /**
   * Handles on cancel click of personal details panel.
   * Cancels editing mode and reverts to the last saved state.
   */
  const onPersonalDetailsCancel = () => {
    setIsReadOnly(true);
    getEmployeePersonalData();
  };

  /**
   * Updates the personal details state when a value changes.
   * @param {any} value - new value
   * @param {string} key - key to update.
   */
  const handlePersonalDetailsChange = (value, key) => {
    setPersonalDetails((empPersonalDetails) => ({ ...empPersonalDetails, [key]: value }));
  };

  /**
   * Handles on Identity Add clcik. Adds a new row for identity data.
   */
  const onClickIdentityAdd = () => {
    setEmployeeIdentityData([
      { identityType: '', nationalId: '', primaryId: false, isNew: true, isEditMode: true },
      ...employeeIdentityData,
    ]);
  };

  /**
   * Handles on Identity Edit clcik. Enables editing mode for a specific identity.
   * @param {number} index - index of the identity to edit.
   */
  const onIdentityEditClick = (index) => {
    const updatedData = [...employeeIdentityData];
    updatedData[index] = { ...updatedData[index], isEditMode: true };
    setEmployeeIdentityData(updatedData);
  };

  /**
   * Saves the identity entry, either creating a new entry or updating an existing one.
   * @param {object} rowData - identity data to save.
   */
  const onIdentitySave = (rowData) => {
    const identity = {
      employeeId: employeeId,
      identityType: rowData.identityType,
      nationalId: rowData.nationalId,
      primaryId: rowData.primaryId,
    };
    if (!isValidIdentity(identity)) {
      toast.error('Please fill in all the fields');
      return;
    }
    if (rowData.isNew) {
      createIdentiy(identity);
    } else {
      updateIdentity(identity);
    }
  };

  /**
   * Validates the identity data.
   * @param {object} identity - identity data
   * @returns {boolean} True if valid, otherwise false.
   */
  const isValidIdentity = (identity) => {
    return identity?.employeeId && identity?.identityType && identity?.nationalId;
  };

  /**
   * Creates a new identity info.
   * @param {object} identity - identity data to create.
   */
  const createIdentiy = (identity) => {
    postData('/identity/save', identity)
      .then((response) => {
        getEmployeeIdentity();
        toast.success('Identity ID deatils saved successfully');
      })
      .catch((error) => {
        const { message } = error?.response?.data;
      });
  };

  /**
   * Updates an existing identity entry.
   * @param {object} identity - identity data to update.
   */
  const updateIdentity = (identity) => {
    postData('/identity/update', identity)
      .then((response) => {
        getEmployeeIdentity();
        toast.success('Identity ID deatils updated successfully');
      })
      .catch((error) => {
        const { message } = error?.response?.data;
      });
  };

  /**
   * Deletes an identity entry.
   * @param {object} rowData - identity data to delete.
   */
  const onDeleteIdentity = (rowData) => {
    const { identityId } = rowData;
    postData('/identity/soft-delete/' + identityId, {})
      .then((response) => {
        getEmployeeIdentity();
        toast.success('Identity ID deleted successfully');
      })
      .catch((error) => {
        const { message } = error?.response?.data;
      });
  };

  /**
   * Cancels editing mode for a specific identity entry.
   * @param {number} index - index of the identity to cancel.
   */
  const onClickIdentityCancel = (index) => {
    let identityData = [...employeeIdentityData];
    const selectedIdentity = employeeIdentityData[index];
    if (selectedIdentity.isNew) {
      identityData.splice(identityData, 1);
    } else {
      identityData[index] = { ...identityData[index], isEditMode: false };
      getEmployeeIdentity();
    }
    setEmployeeIdentityData(identityData);
  };

  return (
    <>
      <Panel
        className="personal-detail-panel"
        bordered
        header={
          <Stack justifyContent="space-between">
            <h5>Personal Details</h5>
            {isReadOnly ? (
              <Button
                style={{ width: '5rem' }}
                className="ghost-btn"
                appearance="ghost"
                size="sm"
                startIcon={<FaPen />}
                onClick={onPersonalDetailsEditClick}
              >
                Edit
              </Button>
            ) : (
              <ButtonToolbar>
                <Button
                  style={{ width: '5rem' }}
                  className="primary-btn"
                  size="sm"
                  appearance="primary"
                  startIcon={<FaFloppyDisk />}
                  onClick={onPersonalDetailsSave}
                >
                  Save
                </Button>
                <Button
                  style={{ width: '5rem' }}
                  size="sm"
                  className="ghost-btn"
                  appearance="ghost"
                  startIcon={<FaXmark />}
                  onClick={onPersonalDetailsCancel}
                >
                  Cancel
                </Button>
              </ButtonToolbar>
            )}
          </Stack>
        }
      >
        <Grid fluid>
          <Row>
            <Col xs={4}>
              <Form>
                <Form.Group controlId="salutation" className="form-field">
                  <Form.ControlLabel>Salutation</Form.ControlLabel>
                  <Form.Control
                    name="salutation"
                    accepter={SelectPicker}
                    data={SALUTATIONS}
                    value={personalDetails.salutation}
                    onChange={(value) => handlePersonalDetailsChange(value, 'salutation')}
                    plaintext={isReadOnly}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={4}>
              <Form>
                <Form.Group controlId="firstName" className="form-field">
                  <Form.ControlLabel>First Name</Form.ControlLabel>
                  <Form.Control
                    name="firstName"
                    value={personalDetails.firstName}
                    plaintext={isReadOnly}
                    onChange={(value) => handlePersonalDetailsChange(value, 'firstName')}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={4}>
              <Form>
                <Form.Group controlId="middleName" className="form-field">
                  <Form.ControlLabel>Middle Name</Form.ControlLabel>
                  <Form.Control
                    name="middleName"
                    value={personalDetails.middleName}
                    defaultChecked="false"
                    plaintext={isReadOnly}
                    onChange={(value) => handlePersonalDetailsChange(value, 'middleName')}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={4}>
              <Form>
                <Form.Group controlId="lastName" className="form-field">
                  <Form.ControlLabel>Last Name</Form.ControlLabel>
                  <Form.Control
                    name="lastName"
                    value={personalDetails.lastName}
                    plaintext={isReadOnly}
                    onChange={(value) => handlePersonalDetailsChange(value, 'lastName')}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={4}>
              <Form>
                <Form.Group controlId="birthName" className="form-field">
                  <Form.ControlLabel>Birth Name</Form.ControlLabel>
                  <Form.Control
                    name="birthName"
                    value={personalDetails.birthName}
                    plaintext={isReadOnly}
                    onChange={(value) => handlePersonalDetailsChange(value, 'birthName')}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={4}>
              <Form>
                <Form.Group controlId="dateOfBirth" className="form-field">
                  <Form.ControlLabel>Date Of Birth</Form.ControlLabel>
                  <Form.Control
                    name="dateOfBirth"
                    accepter={DatePicker}
                    format="MMM dd, yyyy"
                    value={new Date(personalDetails.dateOfBirth)}
                    plaintext={isReadOnly}
                    onChange={(value) => handlePersonalDetailsChange(value, 'dateOfBirth')}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={4}>
              <Form>
                <Form.Group controlId="gender" className="form-field">
                  <Form.ControlLabel>Gender</Form.ControlLabel>
                  <Form.Control
                    name="gender"
                    accepter={SelectPicker}
                    data={GENDERS}
                    value={personalDetails.gender}
                    onChange={(value) => handlePersonalDetailsChange(value, 'gender')}
                    plaintext={isReadOnly}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={4}>
              <Form>
                <Form.Group controlId="placeOfBirth" className="form-field">
                  <Form.ControlLabel>Place Of Birth</Form.ControlLabel>
                  <Form.Control
                    name="placeOfBirth"
                    value={personalDetails.placeOfBirth}
                    plaintext={isReadOnly}
                    onChange={(value) => handlePersonalDetailsChange(value, 'placeOfBirth')}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={4}>
              <Form>
                <Form.Group controlId="countryOfBirth" className="form-field">
                  <Form.ControlLabel>Country Of Birth</Form.ControlLabel>
                  <Form.Control
                    name="countryOfBirth"
                    value={personalDetails.countryOfBirth}
                    plaintext={isReadOnly}
                    onChange={(value) => handlePersonalDetailsChange(value, 'countryOfBirth')}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={4}>
              <Form>
                <Form.Group controlId="maritalStatus" className="form-field">
                  <Form.ControlLabel>Marital Status</Form.ControlLabel>
                  <Form.Control
                    name="maritalStatus"
                    accepter={SelectPicker}
                    data={MARITAL_STATUSES}
                    value={personalDetails.maritalStatus}
                    placeholder="Select Marital Status"
                    onChange={(value) => handlePersonalDetailsChange(value, 'maritalStatus')}
                    plaintext={isReadOnly}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={4}>
              <Form>
                <Form.Group controlId="nationality" className="form-field">
                  <Form.ControlLabel>Nationality</Form.ControlLabel>
                  <Form.Control
                    name="nationality"
                    value={personalDetails.nationality}
                    plaintext={isReadOnly}
                    onChange={(value) => handlePersonalDetailsChange(value, 'nationality')}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Grid>
      </Panel>
      <Panel
        className="personal-detail-panel"
        bordered
        header={
          <Stack justifyContent="space-between">
            <h5>National ID Info</h5>
            <Button
              style={{ width: '5rem' }}
              className="ghost-btn"
              appearance="ghost"
              size="sm"
              startIcon={<FaPlus />}
              onClick={onClickIdentityAdd}
            >
              Add
            </Button>
          </Stack>
        }
      >
        <Table
          autoHeight
          data={employeeIdentityData}
          rowHeight={(rowData) => {
            if (rowData?.isEditMode) {
              return 65;
            }
            return 46;
          }}
        >
          <Column flexGrow={1}>
            <HeaderCell className="identity-table-headercell">National ID Card Type</HeaderCell>
            <Cell className="identity-table-cell">
              {(rowData, rowIndex) => (
                <SelectPicker
                  className="identity-card-type-selection"
                  data={NATIONAL_ID_CARD_TYPES}
                  searchable={true}
                  value={rowData.identityType}
                  plaintext={!rowData.isEditMode}
                  onChange={(value) => {
                    const updatedData = [...employeeIdentityData];
                    updatedData[rowIndex] = { ...updatedData[rowIndex], identityType: value };
                    setEmployeeIdentityData(updatedData);
                  }}
                />
              )}
            </Cell>
          </Column>
          <Column flexGrow={1}>
            <HeaderCell className="identity-table-headercell">National ID</HeaderCell>
            <Cell className="identity-table-cell">
              {(rowData, rowIndex) => (
                <Input
                  style={{ width: '90%' }}
                  value={rowData.nationalId}
                  plaintext={!rowData.isEditMode}
                  onChange={(value) => {
                    const updatedData = [...employeeIdentityData];
                    updatedData[rowIndex] = { ...updatedData[rowIndex], nationalId: value };
                    setEmployeeIdentityData(updatedData);
                  }}
                />
              )}
            </Cell>
          </Column>
          <Column flexGrow={1}>
            <HeaderCell className="identity-table-headercell">Primary ID Type</HeaderCell>
            <Cell className="identity-table-cell">
              {(rowData, rowIndex) => (
                <Toggle
                  checked={rowData.primaryId}
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  plaintext={!rowData.isEditMode}
                  onChange={(value) => {
                    const updatedData = [...employeeIdentityData];
                    updatedData[rowIndex] = { ...updatedData[rowIndex], primaryId: value };
                    setEmployeeIdentityData(updatedData);
                  }}
                />
              )}
            </Cell>
          </Column>
          <Column flexGrow={1}>
            <HeaderCell className="identity-table-headercell">Actions</HeaderCell>
            <Cell>
              {(rowData, rowIndex) => (
                <Stack direction="row" spacing={6}>
                  {rowData?.isEditMode ? (
                    <>
                      <Button
                        className="primary-btn"
                        style={{ width: '5rem' }}
                        appearance="primary"
                        size="sm"
                        onClick={() => onIdentitySave(rowData)}
                      >
                        Save
                      </Button>
                      <Button
                        className="ghost-btn"
                        style={{ width: '5rem' }}
                        size="sm"
                        appearance="ghost"
                        onClick={() => onClickIdentityCancel(rowIndex)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button appearance="link" onClick={() => onIdentityEditClick(rowIndex)}>
                        <FaPen />
                      </Button>
                      <Button
                        color="red"
                        appearance="link"
                        onClick={() => onDeleteIdentity(rowData)}
                      >
                        <FaTrash />
                      </Button>
                    </>
                  )}
                </Stack>
              )}
            </Cell>
          </Column>
        </Table>
      </Panel>
    </>
  );
};

export default Personal;
