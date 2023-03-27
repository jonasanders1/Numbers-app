import React from 'react'
const Fact = ({numberFact}) => {
  return (
    <div className='fact bg-blue-50 rounded-md'>
        <p className='lg:text-5xl text-lg font text-blue-400 '>{numberFact}</p>
    </div>
  )
}

export default Fact

