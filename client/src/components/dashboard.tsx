import * as React from 'react';

interface IProps {}

const Dashboard: React.SFC<IProps> = (props: IProps) => {
	return (
		<div>
			<h1>Cookbook Version 3.0</h1>
			<p>Now with TypeScript and Django</p>
		</div>
	);
};

export default Dashboard;
