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

const Field: React.FC<IFieldProps> = (props: IFieldProps) => (
	<section>
		<label>{props.label}</label>
		<div>
			<div>
				<input
					type={props.type}
					name={props.name}
					value={props.value}
					placeholder={props.placeholder}
					onChange={props.onChange}
				/>
			</div>
			<div>{props.errors.length !== 0 && showErrors(props.errors)}</div>
		</div>
	</section>
);

export default Field;
