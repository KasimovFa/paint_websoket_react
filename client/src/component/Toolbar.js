import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/toolbar.scss';
import Brush from '../tools/Brush';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';
import Oval from '../tools/Oval';
import Rect from '../tools/Rect';

const Toolbar = () => {

    const changeColor = e => {
        toolState.setStrokeColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }

    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL()
        console.log(dataUrl)
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = canvasState.sessionid + ".jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className='toolbar'>
            <div className='toolbar_setting'>
                <button className="toolbar_setting-btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas,canvasState.socket, canvasState.sessionid))} />
                <button className="toolbar_setting-btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas,canvasState.socket, canvasState.sessionid))} />
                <button className="toolbar_setting-btn circle" onClick={() => toolState.setTool(new Oval(canvasState.canvas, canvasState.socket, canvasState.sessionid))}/>
                <button className="toolbar_setting-btn eraser" onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}/>
                <button className="toolbar_setting-btn line" onClick={() => toolState.setTool(new Line(canvasState.canvas))}/>
                <input type="color" onChange={(e) => changeColor(e)}/>
            </div>

            <div className='toolbar_functional'>
               <button className="toolbar_functional-btn undo" onClick={() => canvasState.undo()}/>
               <button className="toolbar_functional-btn redo" onClick={() => canvasState.redo()}/>
               <button className="toolbar_functional-btn save" onClick={() => download()}/>
            </div>

        </div>
    );
};

export default Toolbar;