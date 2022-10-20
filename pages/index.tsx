import { useEffect, useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const init = 1;
    setCount(init + count);
  }, []);

  // passing a empty array to useEffect means that the effect will only by called once
  // this will make that the useEffect will stop be called infinitely and increase the count
  // additionally count have to be set with the previous count value to avoid on of the 
  // react common mistakes

  const increaseScore = () => setCount(prev => prev + 1);

  return (
    <div>
      <p>Counter: {count}</p>
      <button className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline" onClick={increaseScore}>Increase Count</button>
    </div>
  );
}
