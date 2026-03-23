import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => {
    setCount(count + Number(step));
  };

  const decrement = () => {
    setCount(count - Number(step));
  };

  const reset = () => {
    setCount(0);
    setStep(1);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Counter Component</h2>

        <h1 style={styles.count}>{count}</h1>

        <div style={styles.inputBox}>
          <label>Step Value: </label>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.buttons}>
          <button onClick={increment} style={styles.button}>+</button>
          <button onClick={decrement} style={styles.button}>-</button>
          <button onClick={reset} style={styles.reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    backgroundColor: "#f2f2f2",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
  },
  count: {
    fontSize: "40px",
    margin: "20px 0",
  },
  inputBox: {
    marginBottom: "20px",
  },
  input: {
    padding: "6px",
    width: "60px",
    marginLeft: "10px",
  },
  buttons: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  button: {
    padding: "10px 15px",
    fontSize: "18px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  reset: {
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};

export default Counter;