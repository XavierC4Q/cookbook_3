import * as React from 'react';
import { Link } from 'react-router-dom';

export interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => (
    <div className='head-cont'>
        <Link to='/'><h3>Cookbook</h3></Link>
    </div>
);

export default Header;
