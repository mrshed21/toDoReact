import { useState } from "react";

export default function MyApp() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>العدادات التي تتغير مستقلة</h1>
      <MyButton  count={count} setCount={setCount}/>
      <MyButton  count={count} setCount={setCount}/>
    </div>
  );
}

function MyButton({count , setCount}) {
  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
