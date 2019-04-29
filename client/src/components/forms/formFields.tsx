import { FieldProps } from 'formik';
import * as React from 'react';
import { IFormErrors } from '../hooks/useForm';

interface IFieldProps {
	type: string;
	label: string;
	name: string;
	value: string;
	placeholder: string;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
	errors: string[];
	select_options?: string[];
}

const showErrors = (errs: IFormErrors): React.ReactNodeArray => errs.map((e: string) => <p>{e}</p>);

export const Field: React.FC<IFieldProps> = (props: IFieldProps) => (
	<section>
		<label>{props.label}</label>
		<div>
			<div>
				<input
					type={props.type}
					name={props.name}
					defaultValue={props.value}
					placeholder={props.placeholder}
					onInput={props.onChange}
				/>
			</div>
			<div>{props.errors.length !== 0 && showErrors(props.errors)}</div>
		</div>
	</section>
);

export interface IFormValues {
	recipe_name: string;
	description: string;
	ingredients: string[];
}

interface IInputProps extends FieldProps<IFormValues> {
	label: string;
	placeholder: string;
}

export const Input: React.FC<IInputProps> = (props: IInputProps) => {
	return (
		<section>
			<div>
				<label>{props.label}</label>
			</div>
			<div>
				<input {...props.field} type='text' placeholder={props.placeholder} />
			</div>
		</section>
	);
};