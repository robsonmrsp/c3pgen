import { forwardRef } from 'react';

export const FormPage = () => (
  <div className="m-12 p-6 border">
    <Field label="Name" name="name" placeholder="name" dot />
    <Field disabled={true} label="Fullname disabled" name="fullName" />
    <Field
      error="Password is required"
      icon={<LockIcon />}
      label="Password"
      name="password"
      placeholder="password"
      type="password"
    />
    <Field label="Description" name="description" type="textarea" />
    <Field label="Accept terms" name="terms" type="checkbox" />
    <Field label="Choose a framework" name="framework" type="select">
      <option value="" />
      <option>Next.js</option>
      <option>Nuxt.js</option>
      <option>Angular</option>
    </Field>
  </div>
);

/*  COMPONENT LOGIC */

const style = {
  dot: `after:content-['*'] after:ml-0.5 after:text-red-500`,
  error: `ring-red-500 ring-1`,
  disabled: `cursor-not-allowed`,
  container: `relative mb-6 mt-3`,
  errorMessage: `text-sm text-red-500 mt-2`,
  checkboxLabel: `block overflow-hidden h-6 rounded-full bg-gray-300`,
  checkboxContainer: `relative w-10 mr-2 align-middle select-none mt-2`,
  iconContainer: `absolute flex border border-transparent left-0 top-0 h-full w-10`,
  icon: `flex items-center justify-center rounded-tl rounded-bl z-10 text-gray-400 text-lg h-full w-full`,
  checkbox: `checked:bg-blue-500 checked:right-0 focus:outline-none right-4 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer`,
  default: `text-base relative flex flex-1 w-full mt-1 rounded-md py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:border-transparent border`,
};

export const Field = forwardRef(
  (
    { disabled, dot, error, icon, label, name, type = 'text', ...rest },
    ref,
  ) => {
    let component;

    // if you won't use select, you can delete this part
    if (type === 'select') {
      component = (
        <select
          aria-required={dot}
          aria-invalid={!!error}
          className={`${style.default} ${disabled ? style.disabled : ''}
             ${error ? style.error : 'border-gray-300'}
          `}
          disabled={disabled}
          id={name}
          name={name}
          ref={ref}
          {...rest}
        />
      );
    }

    // if you won't use textarea, you can delete this part
    if (type === 'textarea') {
      component = (
        <textarea
          aria-required={dot}
          aria-invalid={!!error}
          className={`${style.default} ${disabled ? style.disabled : ''}
             ${error ? style.error : 'border-gray-300'}
          `}
          disabled={disabled}
          id={name}
          name={name}
          ref={ref}
          {...rest}
        />
      );
    }

    // if you won't use checkbox, you can delete this part and the classes checkbox, checkboxContainer and checkboxLabel
    if (type === 'checkbox') {
      component = (
        <div className={style.checkboxContainer}>
          <input
            aria-required={dot}
            aria-invalid={!!error}
            className={`${style.checkbox} ${disabled ? style.disabled : ''}`}
            disabled={disabled}
            id={name}
            name={name}
            type="checkbox"
            {...rest}
          />
          <span className={style.checkboxLabel} />
        </div>
      );
    }

    // if you won't use input, you can delete this part
    if (type !== 'checkbox' && type !== 'select' && type !== 'textarea') {
      component = (
        <div className="relative">
          <div className={style.iconContainer}>
            <div className={style.icon}>{icon}</div>
          </div>
          <input
            aria-required={dot}
            aria-invalid={!!error}
            className={`${style.default} ${icon ? 'pl-12' : ''}
               ${error ? style.error : 'border-gray-300'}
               ${disabled ? style.disabled : ''}
            `}
            disabled={disabled}
            id={name}
            name={name}
            type={type}
            ref={ref}
            {...rest}
          />
          {error && <ErrorIcon />}
        </div>
      );
    }

    return (
      <div className={`${style.container} ${disabled ? 'opacity-50' : ''}`}>
        <label htmlFor={name} className={`text-gray-700 ${dot && style.dot}`}>
          {label}
        </label>
        {component}
        {error && (
          <span role="alert" className={style.errorMessage}>
            {error}
          </span>
        )}
      </div>
    );
  },
);

Field.displayName = 'Field';

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="currentColor"
    className="absolute right-2 -mt-7 text-red-500"
    viewBox="0 0 1792 1792"
  >
    <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z" />
  </svg>
);

const LockIcon = () => (
  <svg
    height="20"
    width="20"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
  </svg>
);