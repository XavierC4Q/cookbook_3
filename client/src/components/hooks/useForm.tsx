import * as React from 'react';

export interface IFormErrors {
	[key: string]: any;
}

export interface IFormState {
    inputs: { [key: string] : any };
    handleInput: (e: React.FormEvent<HTMLInputElement>) => void;
    errors: { [key: string] : string[] | any };
    handleErrors: (errs: IFormErrors) => void;
    resetForm: () => void;
}

const initialErrors = (values: object): object => {
	let errs: { [key: string]: string[] } = {};
	for (let k in values) {
		errs[k] = [];
	}
	return errs;
};

const useFormHook = (values: object) => {
	const initialState = { ...values };

	const [ inputs, setInputs ] = React.useState(initialState);

	const [ errors, setErrors ] = React.useState(initialErrors(initialState));

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		setInputs({
			...inputs,
			[e.currentTarget.name]: e.currentTarget.value
		});
	};

	const handleErrors = (errs: IFormErrors) => {
		let newErrors: { [key: string]: any } = { ...errors };
		for (let k in errs) {
			let splitErr = errs[k].split(': ');
			newErrors[splitErr[0]].push(splitErr[1]);
		}
		setErrors(newErrors);
	};

	const resetForm = () => {
		setInputs(initialState);
		setErrors(initialState);
	};

	return { inputs, handleInput, errors, handleErrors, resetForm };
};

export default useFormHook;
