import React from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';

const TabName = ({ tab }) => {
    const { tabName, category } = tab;
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    function handleClick() {
        const query = queryString.stringifyUrl({
            url: '/order/',
            query: { category: category }
        })
        navigate(query)
    }
    const isActive = searchParams.get('category') === category

    return (
        <NavLink onClick={handleClick} className={`tab ${isActive && 'tab-active text-warning '}`}>
            {tabName}
        </NavLink>
    )
};

export default TabName;