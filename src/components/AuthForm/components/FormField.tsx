import { Input, Label } from '@/components/ui';
import type { TFormField } from '@/types';

const FormField = ({ name, label, placeholder, value, onChange, error }: TFormField) => {
  return (
    <div className="grid gap-1">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={name}
        required
        className={error ? 'input-error' : ''}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;
