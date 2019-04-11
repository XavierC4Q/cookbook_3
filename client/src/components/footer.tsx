import * as React from 'react';

export interface IFooterProps {}

const Footer: React.FC<IFooterProps> = (props: IFooterProps) => {
	return (
		<div className='footer-cont'>
			<div className='footer-links'>
				<a href='https://github.com/XavierC4Q'>
					<h3>My Github</h3>
				</a>
				<a href='https://linkedin.com/in/xavier-james-munroe/'>
					<h3>LinkedIn</h3>
				</a>
			</div>
		</div>
	);
};

export default Footer;
