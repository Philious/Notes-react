import '@/components/textField.scss';
type TextFieldProps = {
  value: string,
  
  setValue: (update: string) => void; 
  name: string,
  className?: string | string[],
  placeholder?: string
  label?: string
};

function TextField({value, setValue, name, className, placeholder, label}:TextFieldProps) {
  const classes = `input-field-container ${className
    ? Array.isArray(className)
      ? className.join(' ') : className
    : ''
}`;

  return (
  <div className={classes}>
    { label && <span>{label}</span> }
    <input
        name={name}
        className="input-field"
        value={value}
        placeholder={placeholder}
        onChange={ (ev) => setValue(ev.target.value) }
      />
    </div>
  )
}

export default TextField;