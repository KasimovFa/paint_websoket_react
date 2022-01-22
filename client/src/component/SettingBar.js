import React from 'react';
import toolState from '../store/toolState';
import '../styles/settingbar.scss';

const SettingBar = () => {
    return (
        <div className='settingbar'>
          <div className='settingbar_wrapper'>
            <label htmlFor="line-width">Толщина линии</label>
            <input 
               type="number"
               id='line-width'
               defaultValue={1}
               min = {1}
               max={56}
               onChange={(e) => toolState.setLineWidth(e.target.value ? e.target.value  : 1 )}  
             />
             <label htmlFor="stroke-color">Цвет обводки</label>
             <input 
                id="stroke-color" 
                type="color"
                onChange={(e) => toolState.setFillColor(e.target.value)}
             />
            </div>
        </div>
    );
};

export default SettingBar;