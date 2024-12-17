import { useState } from 'react';
import cls from './Counter.module.scss'


export function Counter() {
  const [count, setCount] = useState(0)
  return ( 
    <div>
      <button className={cls.btn} onClick={() => setCount(count - 1)}>-</button>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
   );
}