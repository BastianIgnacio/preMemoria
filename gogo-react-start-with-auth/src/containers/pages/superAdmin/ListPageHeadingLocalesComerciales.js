import React, { createRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
  ModalHeader,
  ModalBody,
  Modal,
  Card,
  CardBody,
  FormGroup,
  Label,
  Spinner,
} from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import { LOCALCOMERCIAL_CHANGE_PAGE_SIZE } from '../../../redux/actions';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import BottomNavigation from '../../../components/wizard/BottomNavigation';
import TopNavigation from '../../../components/wizard/TopNavigation';

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const validateName = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your name';
  } else if (value.length < 2) {
    error = 'Value must be longer than 2 characters';
  }
  return error;
};

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 6) {
    error = 'Password must be longer than 6 characters';
  }
  return error;
};

const ListPageHeading = () => {
  const dispatch = useDispatch();
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  const pageSizes = [4, 8, 12, 20];
  const heading = 'Locales Comerciales';
  const itemsPorPagina = useSelector(
    (state) => state.localComercial.itemsPorPagina
  );
  const totalItems = useSelector((state) => state.localComercial.totalItems);
  const startItem = useSelector((state) => state.localComercial.startItem);
  const endItem = useSelector((state) => state.localComercial.endItem);

  const changePageSize = (size) => {
    dispatch({
      type: LOCALCOMERCIAL_CHANGE_PAGE_SIZE,
      payload: {
        itemsPorPagina: size,
        papaginaActual: 1,
      },
    });
  };

  const nuevoLocalComercial = () => {
    setModalAdd(!modalAdd);
  };

  const forms = [createRef(null), createRef(null), createRef(null)];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([
    {
      valid: false,
      name: 'linkLocalComercial',
      value: '',
    },
    {
      valid: false,
      name: 'email',
      value: '',
    },
    {
      valid: false,
      name: 'password',
      value: '',
    },
  ]);

  const asyncLoading = () => {
    setLoading(true);
    console.log(fields);
    // Aca debemos enviar el put
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const onClickNext = (goToNext, steps, step) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;
    const { name } = fields[formIndex];
    form.submitForm().then(() => {
      const newFields = [...fields];

      newFields[formIndex].value = form.values[name];
      newFields[formIndex].valid = !form.errors[name];
      setFields(newFields);

      if (!form.errors[name] && form.touched[name]) {
        goToNext();
        // eslint-disable-next-line no-param-reassign
        step.isDone = true;
        if (steps.length - 2 <= steps.indexOf(step)) {
          setBottomNavHidden(true);
          asyncLoading();
        }
      }
    });
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>{heading}</h1>

          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => nuevoLocalComercial()}
            >
              Nuevo Local Comercial
            </Button>
            {'  '}
          </div>
        </div>

        <div className="mb-2">
          <Button
            color="empty"
            className="pt-0 pl-0 d-inline-block d-md-none"
            onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
          >
            Opciones <i className="simple-icon-arrow-down align-middle" />
          </Button>
          <Collapse
            isOpen={displayOptionsIsOpen}
            className="d-md-block"
            id="displayOptions"
          >
            <div className="float-md-right pt-1">
              <span className="text-muted text-small mr-1">{`${startItem}-${endItem} de ${totalItems} `}</span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-dark" size="xs">
                  {itemsPorPagina}
                </DropdownToggle>
                <DropdownMenu right>
                  {pageSizes.map((size, index) => {
                    return (
                      <DropdownItem
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        onClick={() => changePageSize(size)}
                      >
                        {size}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Collapse>
        </div>
        <Separator className="mb-5" />
      </Colxx>
      <Modal isOpen={modalAdd} size="lg" toggle={() => setModalAdd(!modalAdd)}>
        <ModalHeader>Nuevo Local Comercial</ModalHeader>
        <ModalBody>
          <Card>
            <CardBody className="wizard wizard-default">
              <Wizard>
                <TopNavigation className="justify-content-center" disableNav />
                <Steps>
                  <Step id="step1" name="LOCAL COMERCIAL" desc="Link">
                    <div className="wizard-basic-step">
                      <Formik
                        innerRef={forms[0]}
                        initialValues={{
                          linkLocalComercial: fields[0].value,
                        }}
                        // eslint-disable-next-line prettier/prettier
                        onSubmit={() => { }}
                      >
                        {({ errors, touched }) => (
                          <Form className="av-tooltip tooltip-label-right">
                            <FormGroup>
                              <Label>Link Local Comercial</Label>
                              <Field
                                className="form-control"
                                name="linkLocalComercial"
                                validate={validateName}
                              />
                              {errors.linkLocalComercial &&
                                touched.linkLocalComercial && (
                                  <div className="invalid-feedback d-block">
                                    {errors.linkLocalComercial}
                                  </div>
                                )}
                            </FormGroup>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Step>
                  <Step id="step2" name="CREDENCIALES" desc="Email">
                    <div className="wizard-basic-step">
                      <Formik
                        innerRef={forms[1]}
                        initialValues={{
                          email: fields[1].value,
                        }}
                        // eslint-disable-next-line prettier/prettier
                        onSubmit={() => { }}
                      >
                        {({ errors, touched }) => (
                          <Form className="av-tooltip tooltip-label-right">
                            <FormGroup>
                              <Label>Email</Label>
                              <Field
                                className="form-control"
                                name="email"
                                validate={validateEmail}
                              />
                              {errors.email && touched.email && (
                                <div className="invalid-feedback d-block">
                                  {errors.email}
                                </div>
                              )}
                            </FormGroup>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Step>
                  <Step id="step3" name="CREDENCIALES" desc="Contraseña">
                    <div className="wizard-basic-step">
                      <Formik
                        innerRef={forms[2]}
                        initialValues={{
                          password: fields[2].value,
                        }}
                        // eslint-disable-next-line prettier/prettier
                        onSubmit={() => { }}
                      >
                        {({ errors, touched }) => (
                          <Form className="av-tooltip tooltip-label-right error-l-75">
                            <FormGroup>
                              <Label>Contraseña</Label>
                              <Field
                                className="form-control"
                                name="password"
                                type="password"
                                validate={validatePassword}
                              />
                              {errors.password && touched.password && (
                                <div className="invalid-feedback d-block">
                                  {errors.password}
                                </div>
                              )}
                            </FormGroup>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Step>
                  <Step id="step4" hideTopNav>
                    <div className="wizard-basic-step text-center pt-3">
                      {loading ? (
                        <div>
                          <Spinner color="primary" className="mb-1" />
                          <p>Cargando</p>
                        </div>
                      ) : (
                        <div>
                          <h2 className="mb-2">Registro completado</h2>
                          <p>{fields[0].value}</p>
                          <p>{fields[1].value}</p>
                          <p>{fields[2].value}</p>
                        </div>
                      )}
                    </div>
                  </Step>
                </Steps>
                <BottomNavigation
                  onClickNext={onClickNext}
                  onClickPrev={onClickPrev}
                  // eslint-disable-next-line prettier/prettier
                  className={`justify-content-center ${bottomNavHidden && 'invisible'
                    // eslint-disable-next-line prettier/prettier
                    }`}
                  prevLabel="Atras"
                  nextLabel="Siguiente"
                />
              </Wizard>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </Row>
  );
};

export default injectIntl(ListPageHeading);
