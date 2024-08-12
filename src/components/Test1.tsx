import React, { useState } from 'react';
import { Space } from 'antd';
import { useTranslation } from "react-i18next";
import './Test1.scss';

// types
import { Shapes } from '../types/shapes';

const Test1 = () => {
  const [shapes, setShapes] = useState<Shapes[]>([
    { name: 'Square', sequence: 1 },
    { name: 'Circle', sequence: 2 },
    { name: 'Oval', sequence: 3 },
    { name: 'Trapezoid', sequence: 4 },
    { name: 'Rectangle', sequence: 5 },
    { name: 'Rhombus', sequence: 6 },
  ]);

  const { t } = useTranslation();

  const movePosition = (position: 'up' | 'down' | 'left' | 'right') => {
    setShapes((prev) => {
      let newShapes = [...prev];
      if (position === 'up' || position === 'down') {
        const topRow = newShapes.slice(0, 3);
        const bottomRow = newShapes.slice(3, 6);
        newShapes = [...bottomRow, ...topRow];
      } else if (position === 'left') {
        const firstShape = newShapes.shift();
        newShapes.push(firstShape as Shapes);
      } else {
        const lastShape = newShapes.pop();
        newShapes.unshift(lastShape as Shapes);
      }
      return newShapes;
    });
  };

  const ramdomPosition = () => {
    setShapes((prev) => {
      const newShapes = [...prev];
      const randomIndex = Math.floor(Math.random() * newShapes.length);
      const randomShape = newShapes[randomIndex];
      newShapes.splice(randomIndex, 1);
      newShapes.push(randomShape);
      return newShapes;
    });
  };

  return (
    <div className="Test1">
      <div className="ButtonGroup">
        <div className="BTN ButtonLeft" onClick={() => movePosition('left')}>
          <div className="Arrow"></div>
          <div className="TextArrow">
            <Space>{t('Move Shape')}</Space>
          </div>
        </div>

        <div className="Center">
          <div className="BTN ButtonUp" onClick={() => movePosition('up')}>
            <div className="Arrow"></div>
          </div>
          <div className="BTN ButtonDown" onClick={() => movePosition('down')}>
            <div className="Arrow"></div>
          </div>
          <div className="TextArrow">
            <Space>{t('Move Position')}</Space>
          </div>
        </div>

        <div className="BTN ButtonRight" onClick={() => movePosition('right')}>
          <div className="Arrow"></div>
          <div className="TextArrow">
            <Space>{t('Move Shape')}</Space>
          </div>
        </div>
      </div>

      <div className="ShapeGroup">
        <div className="TopRow">
          <div></div>
          {shapes.slice(0, 3).map((shape, index) => (
            <div key={index} className='Shape' onClick={ramdomPosition}>
              <div className={`${shape.name}`}></div>
            </div>
          ))}
        </div>
        <div className="BottomRow">
          {shapes.slice(3, 6).map((shape, index) => (
            <div key={index} className='Shape' onClick={ramdomPosition}>
              <div className={`${shape.name}`}></div>
            </div>
          ))}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Test1;
