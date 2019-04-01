import * as React from 'react';

interface IDashboardProps {}

const Dashboard: React.SFC<IDashboardProps> = (props: IDashboardProps) => {
	return (
		<div>
			<h1>Cookbook Version 3.0</h1>
			<p>Now with TypeScript and Django</p>
		</div>
	);
};

export default Dashboard;
