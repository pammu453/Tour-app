import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {

  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(currentCount => --currentCount)
    }, 1000)
    if (count === 0) navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate])

  return (
    <div>
      <h5 style={{ marginTop: "70px" }}>
        <h1>Login Please</h1>
        Redirecting you in {count} seconds
      </h5>
    </div>
  )
}

export default LoadingToRedirect
