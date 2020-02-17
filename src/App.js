import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

const App = () => {
  const [imgSrcs, setImgSrcs] = useState('');
  const [numbers, setNumbers] = useState([]);

  const randomNumber = () => Math.floor(Math.random() * (200 + 1 - 1)) + 1;
  const getRandomNumbers = n => {
    const numbers = [];
    for (let i = 0; i < n; i++) {
      numbers.push(randomNumber());
    }
    return numbers;
  };

  useEffect(() => {
    setNumbers(getRandomNumbers(11 * 4));
  }, []);

  const shot = async n => {
    for (let i = 0; i < n; i++) {
      html2canvas(document.querySelector('#capture' + i.toString()))
        .then(canvas => {
          const imgData = canvas.toDataURL();
          return imgData;
        })
        .then(imgData => {
          setImgSrcs(imgData);
        });
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
    return (
      <div
        key={index}
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
        {issues.map((issue, index2) => {
          return (
            <div
              key={index2}
              style={{
                position: 'absolute',
                width: issue[3] - issue[2] - 1,
                height: issue[1],
                top: numbers[index + 1 * index2],
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

  const renderScreenshotAndButton = n => {
    return (
      <div>
        <div>
          <img src={imgSrcs} />
        </div>
        <a
          href={imgSrcs}
          download="screenshot.png"
          style={{
            display: 'inline-block',
            background: 'green',
            color: '#fff',
            padding: 3,
            textDecoration: 'none'
          }}
        >
          DOWNLOAD
        </a>
      </div>
    );
  };

  return (
    <div>
      {renderNphases(1)}
      <div
        style={{
          background: 'yellow',
          padding: 3,
          width: 100,
          cursor: 'pointer'
        }}
        onClick={async () => shot(1)}
      >
        generate image
      </div>
      <div>{imgSrcs ? renderScreenshotAndButton() : null}</div>
    </div>
  );
};

export default App;
