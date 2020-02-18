import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

const App = () => {
  const [imgSrcs, setImgSrcs] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [index, setIndex] = useState(null);

  const randomNumber = () => Math.floor(Math.random() * (200 + 1 - 1)) + 1;
  const getRandomNumbers = n => {
    const numbers = [];
    for (let i = 0; i < n; i++) {
      numbers.push(randomNumber());
    }
    return numbers;
  };

  useEffect(() => {
    setNumbers(getRandomNumbers(11));
  }, []);

  const shot = async n => {
    for (let i = 0; i < n; i++) {
      html2canvas(document.querySelector('#capture' + i.toString()))
        .then(canvas => {
          const imgData = canvas.toDataURL();
          return imgData;
        })
        .then(imgData => {
          const array = imgSrcs.slice();
          array.push(imgData);
          setImgSrcs(array);
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

  const renderScreenshotAndButton = () => {
    return imgSrcs.map((src, index) => {
      return (
        <div key={index} style={{ display: 'inline-block', marginRight: 10 }}>
          <div>
            <img src={src} />
          </div>
          <a
            href={src}
            download={`screenshot${index}.png`}
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
    });
  };

  const playIndex = () => {
    let count = 0;
    const id = setInterval(() => {
      setIndex(count);
      count++;
      if (count === imgSrcs.length) {
        clearInterval(id);
      }
    }, 800);
  };

  return (
    <div>
      {renderNphases(1)}
      <div style={{ margin: '15px 0' }}>
        <div
          style={{
            display: 'inline-block',
            background: 'pink',
            marginRight: 10,
            padding: 3,
            width: 100,
            cursor: 'pointer'
          }}
          onClick={() => setNumbers(getRandomNumbers(11))}
        >
          generate phase
        </div>
        <div
          style={{
            display: 'inline-block',
            background: 'yellow',
            padding: 3,
            width: 100,
            cursor: 'pointer'
          }}
          onClick={async () => shot(1)}
        >
          screenshot!
        </div>
      </div>
      <div>
        {imgSrcs.length ? (
          <React.Fragment>
            {renderScreenshotAndButton()}
            <div>
              <div
                onClick={playIndex}
                style={{ background: 'blue', margin: '10px 0' }}
              >
                PLAY
              </div>
              <img src={imgSrcs[index]} />
            </div>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default App;
