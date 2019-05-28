import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import FieldWrapper from '../FieldWrapper';

const Radio = styled.div`
  display: block;
  margin-bottom: 1vh;
`;

export const RenderField = ({
  options,
  input,
  label,
  meta: { touched, error, warning, submitting },
  ...rest
}) => (
  <FieldWrapper
    inputName={input.name}
    touched={touched}
    error={error}
    warning={warning}
  >
    {options.map(option => (
      <Radio key={option}>
        <input
          type="radio"
          {...input}
          {...rest}
          id={`${option}Option`}
          value={option}
          checked={option === input.value}
          disabled={!!submitting}
        />
        <label id={`${option}Label`} htmlFor={`${option}Option`}>
          {option}
        </label>
      </Radio>
    ))}
  </FieldWrapper>
);

export default function RadioGroupField(props) {
  return <Field {...props} component={RenderField} />;
}
