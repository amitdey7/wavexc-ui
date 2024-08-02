import React, { useState, useEffect, useCallback } from 'react';
import { FaPen, FaFloppyDisk, FaXmark } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { getData, postData } from '../../service/api';
import { Panel, Button, Table, Stack, Col, Grid, Form, Row, ButtonToolbar } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

const ContactDetails = () => {
  const { employeeId } = useParams();
  const [isContactInfoReadOnly, setIsContactInfoReadOnly] = useState(true);
  const [isEmergencyDetailsReadOnly, setIsEmergencyDetailsReadOnly] = useState(true);
  const [contactDetails, setContactDetails] = useState({});

  const getEmployeeContactData = useCallback(() => {
    getData(`/contact/${employeeId}`)
      .then((data) => {
        const conatctDetails = {
          business: data.find((item) => item.contactType === 'BE'),
          personal: data.find((item) => item.contactType === 'PE'),
          mobile: data.find((item) => item.contactType === 'PH'),
          phone: data.find((item) => item.contactType === 'PH'),
        };
        setContactDetails(conatctDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [employeeId]);

  useEffect(() => {
    getEmployeeContactData();
  }, [employeeId, getEmployeeContactData]);

  const onContactInfoEditClick = () => {
    setIsContactInfoReadOnly(false);
  };

  const onEmergencyInfoEditClick = () => {
    setIsEmergencyDetailsReadOnly(false);
  };

  return (
    <>
      <Panel
        className="personal-detail-panel"
        bordered
        header={
          <Stack justifyContent="space-between">
            <h5>Contact Information</h5>
            {isContactInfoReadOnly ? (
              <Button
                style={{ width: '5rem' }}
                className="ghost-btn"
                appearance="ghost"
                size="sm"
                startIcon={<FaPen />}
                onClick={onContactInfoEditClick}
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
                >
                  Save
                </Button>
                <Button
                  style={{ width: '5rem' }}
                  size="sm"
                  className="ghost-btn"
                  appearance="ghost"
                  startIcon={<FaXmark />}
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
            <Col xs={6}>
              <Form>
                <Form.Group controlId="businessEmail" className="form-field">
                  <Form.ControlLabel>Business Email</Form.ControlLabel>
                  <Form.Control
                    name="businessEmail"
                    plaintext={isContactInfoReadOnly}
                    value={contactDetails.business?.contactValue}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={6}>
              <Form>
                <Form.Group controlId="personalEmail" className="form-field">
                  <Form.ControlLabel>Personal Email</Form.ControlLabel>
                  <Form.Control
                    name="personalEmail"
                    plaintext={isContactInfoReadOnly}
                    value={contactDetails.personal?.contactValue}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={6}>
              <Form>
                <Form.Group controlId="mobile" className="form-field">
                  <Form.ControlLabel>Mobile</Form.ControlLabel>
                  <Form.Control
                    name="mobile"
                    defaultChecked="false"
                    plaintext={isContactInfoReadOnly}
                    value={contactDetails.mobile?.contactValue}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={6}>
              <Form>
                <Form.Group controlId="phone" className="form-field">
                  <Form.ControlLabel>Phone</Form.ControlLabel>
                  <Form.Control
                    name="phone"
                    plaintext={isContactInfoReadOnly}
                    value={contactDetails.phone?.contactValue}
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
            <h5>Emergency Details</h5>
            {isEmergencyDetailsReadOnly ? (
              <Button
                style={{ width: '5rem' }}
                className="ghost-btn"
                appearance="ghost"
                size="sm"
                startIcon={<FaPen />}
                onClick={onEmergencyInfoEditClick}
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
                >
                  Save
                </Button>
                <Button
                  style={{ width: '5rem' }}
                  size="sm"
                  className="ghost-btn"
                  appearance="ghost"
                  startIcon={<FaXmark />}
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
            <Col xs={6}>
              <Form>
                <Form.Group controlId="relationship" className="form-field">
                  <Form.ControlLabel>Relationship</Form.ControlLabel>
                  <Form.Control name="relationship" plaintext={isEmergencyDetailsReadOnly} />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={6}>
              <Form>
                <Form.Group controlId="name" className="form-field">
                  <Form.ControlLabel>Name</Form.ControlLabel>
                  <Form.Control name="name" plaintext={isEmergencyDetailsReadOnly} />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={6}>
              <Form>
                <Form.Group controlId="phone" className="form-field">
                  <Form.ControlLabel>Phone</Form.ControlLabel>
                  <Form.Control name="phone" plaintext={isEmergencyDetailsReadOnly} />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={6}>
              <Form>
                <Form.Group controlId="email" className="form-field">
                  <Form.ControlLabel>Email</Form.ControlLabel>
                  <Form.Control name="email" plaintext={isEmergencyDetailsReadOnly} />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Grid>
      </Panel>
    </>
  );
};

export default ContactDetails;
