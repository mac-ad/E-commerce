import React from 'react'

const Wrapper = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className=" w-[90%] mx-auto">
            {children}
        </div>
    )
}

export default Wrapper
