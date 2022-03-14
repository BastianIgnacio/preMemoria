/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Row } from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from '../../components/common/CustomSelectInput';
import { Colxx } from '../../components/common/CustomBootstrap';

const selectData = [
  { label: 'Region del Maule', value: 'maule', key: 0 },
  { label: 'Region Metropolitana', value: 'metropolitana', key: 1 },
  { label: 'Region de Ohiggins', value: 'ohiggins', key: 2 },
];

const ReactSelectRegiones = () => {
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <Row>
      <Colxx xxs="12" md="12">
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          value={selectedOption}
          onChange={setSelectedOption}
          options={selectData}
        />
      </Colxx>
    </Row>
  );
};
export default ReactSelectRegiones;
