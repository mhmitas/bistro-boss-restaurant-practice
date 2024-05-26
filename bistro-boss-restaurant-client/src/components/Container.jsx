import React from 'react';

const Container = ({ children }) => {
    return (
        <div className='lg:px-8 px-4'>
            {children}
        </div>
    );
};

export default Container;