import React from 'react';
import { IonInput, IonItem } from '@ionic/react';

interface Props {
  value: any;
  onChange: () => string | null;
  onBlur?: () => string;
  error: string | boolean;
  label: string;
  name?: string;
  type?: null;
}
export const Input = ({ value, onChange, error, label, name }) => {
  return (
    <div className="mt-4 mb-4">
      <IonItem>
        <IonInput
          type={'text'}
          name={name}
          value={value}
          onIonChange={onChange}
          helperText={error}
          labelPlacement="floating"
          errorText="Invalid email"
          label={label}
          color={error !== undefined ? 'danger' : 'primary'}
        ></IonInput>
      </IonItem>
    </div>
  );
};
