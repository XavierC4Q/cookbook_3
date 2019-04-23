import * as React from 'react';

export interface IFormErrors {
	[key: string]: any;
}

export interface IFormState {
	inputs: { [key: string]: any };
	handleInput: (e: React.FormEvent<HTMLInputElement>) => void;
	errors: { [key: string]: string[] | any };
	handleErrors: (errs: IFormErrors) => void;
	resetForm: () => void;
}

const initialErrors = (values: object): object => {
	const errs: { [key: string]: string[] } = {};

	for (const k in values) {
		errs[k] = [];
	}
	return errs;
};

/**
 * @constant useFormHook
 * @param values
 * @description
 * A hook for handling many form methods. Takes in values, an object with
 * key/value pairs of form input fields. Returns an object with the form inputs,
 * the form errors and methods for handling the inputs and errors.
 * Included methods are:
 * @method handleInput
 * handles form field inputs.
 * @method handleErrors
 * handles errors for field inputs. Returns an array of error messages
 * @method resetForm
 * resets form values
 */
const useFormHook = (values: object) => {
	const initialState = { ...values };

	const [ inputs, setInputs ] = React.useState(initialState);

	const [ errors, setErrors ] = React.useState(initialErrors(initialState));

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		setInputs({
			...inputs,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	};
	/**
	 * @constant handleErrors
	 * @param errs
	 * An array of strings. Errors are formatted as 'NAME OF FIELD: ERROR MESSAGE'
	 * @description
	 * Recieves a Yup validation error array of messages. For each error message,
	 * handleErrors creates a key for the field and pushes in the error message.
	 * Sets the errors of the form with the newly created error object.
	 */
	const handleErrors = (errs: IFormErrors) => {
		const newErrors: { [key: string]: any } = { ...errors };

		for (const k in errs) {
			const splitErr = errs[k].split(': ');
			newErrors[splitErr[0]].push(splitErr[1]);
		}
		setErrors(newErrors);
	};
	/**
	 * @constant resetForm
	 * @description
	 * Resets the form input values and clears the errors object.
	 */
	const resetForm = () => {
		setInputs(initialState);
		setErrors(initialState);
	};

	return { inputs, handleInput, errors, handleErrors, resetForm };
};

export default useFormHook;
