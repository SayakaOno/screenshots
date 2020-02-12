import React, { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

const App = () => {
  const canvasRef = useRef();
  const shot = n => {
    for (let i = 0; i < n; i++) {
      html2canvas(document.querySelector('#capture' + i.toString())).then(
        canvas => {
          canvasRef.current.appendChild(canvas);
        }
      );
    }
  };
  const issues = [
    // row, hight, start, end, color
    [5, 2, 1, 41, '#3000FF'],
    [5, 6, 40, 100, '#A699FF'],
    [20, 3, 1, 100, '#3000FF'],
    [50, 5, 1, 100, '#3000FF'],
    [55, 3, 1, 100, '#A699FF'],
    [70, 3, 1, 100, '#3000FF'],
    [90, 3, 1, 100, '#3000FF'],
    [110, 14, 1, 90, '#A699FF'],
    [150, 5, 1, 100, '#3000FF'],
    [160, 5, 1, 100, '#3000FF'],
    [167, 5, 1, 100, '#3000FF']
  ];

  const renderNphases = number => {
    let phases = [];
    for (let i = 0; i < number; i++) {
      phases.push(renderPhase(i));
    }
    return phases.map(phase => phase);
  };

  const renderPhase = index => {
    let number = () => Math.floor(Math.random() * (200 + 1 - 1)) + 1;

    return (
      <div
        id={`capture${index}`}
        style={{
          width: 98,
          height: 200,
          border: 'blue solid 1px',
          position: 'relative',
          display: 'inline-block',
          marginRight: 20,
          overflow: 'hidden'
        }}
      >
        {issues.map(issue => {
          return (
            <div
              style={{
                position: 'absolute',
                width: issue[3] - issue[2] - 1,
                height: issue[1],
                top: number(),
                left: issue[2],
                background: issue[4],
                content: ''
              }}
            ></div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {renderNphases(4)}
      <div style={{ background: 'yellow' }} onClick={() => shot(4)}>
        button
      </div>
      <div ref={canvasRef}></div>
    </div>
  );
};

export default App;
