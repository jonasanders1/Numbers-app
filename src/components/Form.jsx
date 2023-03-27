import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Fact from './Fact';
import styled from 'styled-components';
import {MdTouchApp} from 'react-icons/md'

    
    // http://numbersapi.com/5/math
    // http://numbersapi.com/3/24/date
    // http://numbersapi.com/random/trivia

const Form = () => {
    const [number, setNumber] = useState('350')
    const [numberFact, setNumberFact] = useState([])
    const [selectedOption, setSelectedOption] = useState('') 

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
      setIsHovering(true);
    };
  
    const handleMouseLeave = () => {
        setIsHovering(false);
    };
    useEffect(() => {
        if(number){
            axios.get(`http://numbersapi.com/${number}/${selectedOption}`)
            .then(response => setNumberFact(response.data))
            .catch( error => console.log(error))
        }

        }, [number])

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const handeRandomFactClick = (event) => {
        event.preventDefault();
        axios.get(`http://numbersapi.com/random/${selectedOption}`)
        .then(response => setNumberFact(response.data))
        .catch( error => console.log(error))
    }

    const handleInput = (e) => {
        setNumber(e.target.value)
    }

  return (
    <div className='container'>
        <form>
            <div>
                <label className='lg:text-2xl text-lg text-white'>Choose topic</label>
     
                <select value={selectedOption} onChange={handleOptionChange}
                className="bg-blue-50 px-2 py-1 lg:text-2xl text-lg rounded-md text-blue-400"
                >
                    <option value="trivia">Number Trivia</option>
                    <option value="math">Math Fact</option>
                    <option value="date">Date Fact</option>
                </select>

            </div>
            <div>
                <label 
                    className='lg:text-2xl text-lg text-white'>Search for any number 
                    {selectedOption == "date" && <span className='text-sm ml-3 text-black'>month / day</span>}
                </label>
                <input 
                    className='bg-blue-50 px-2 py-1 lg:text-2xl text-lg rounded-md text-blue-400'
                    type={selectedOption === 'date' ? 'text' : 'number'}
                    placeholder='450' 
                    onChange={(e) => handleInput(e)}
                    />
            </div>

            <div className="popup-container">
                <label
                    className="popup-label lg:text-2xl text-lg text-white"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    or.. <MdTouchApp className='icon'></MdTouchApp>
                </label>
                {isHovering && (
                    <div className="popup rounded-md">
                    <p>Choose a topic and and click the btn to get random fact</p>
                    </div>
                )}
                <button 
                    onClick={handeRandomFactClick}
                    className='bg-blue-50 px-2 py-1 lg:text-2xl text-lg rounded-md text-blue-400 
                    hover:bg-blue-300 hover:text-white duration-100 mt-6'
                >Get Random
                </button>
            </div>
        </form>
        <div className='fact-container'>
            <Fact numberFact={numberFact} className='fact'/>
        </div>
    </div>
  )
}

export default Form
