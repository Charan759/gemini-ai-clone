import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
  const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)
  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt='' />
      </div>
      <div className="main-container">
        {!showResult 
        ?<>
         <div className="greet">
          <p><span>Hello! Dev.</span></p>
          <p>How can i help you?</p>
        </div>
        <div className="cards">
            <div className="card">
              <p>suggest beautiful places to see on upcoming road trip</p>
              <img src= {assets.compass_icon} alt='' />
            </div>
            <div className="card">
              <p>Breifly summarize this concept: urban planning</p>
              <img src= {assets.bulb_icon} alt='' />
            </div>
            <div className="card">
              <p>Brainstorm team bonding acitivities for our work retreat</p>
              <img src= {assets.message_icon} alt='' />
            </div>
            <div className="card">
              <p>Imporve the readability of the following code</p>
              <img src= {assets.code_icon} alt='' />
            </div>
        </div>
        </>
        :<div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="resultdata">
            <img src={assets.gemini_icon} alt="" />
            </div>
            {
            loading ? (
             <div className='loader'>
              <hr />
              <hr />
              <hr />
               <div></div>
             </div>
            ) : (
            <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
            )
            }
  
            
        </div>
        }
        <div className="main-bottom">
          <div className="searchbox"> 
            <input onChange={(e)=>setInput(e.target.value)} value={input} type='text' placeholder='enter a prompt here' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />: null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may disply inaccurate information, including about people, so double check its reponses, Your privacy and Gemini apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
