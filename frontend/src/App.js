import React, { useState } from "react";

const App = () => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const getGreeting = async () => {
        if (!name.trim()) {
            setError("Please enter your name.");
            setMessage("");
            return;
        }
        setError(""); // Clear previous errors

        try {
            const response = await fetch(`https://greetme1.onrender.com/api/greet?name=${name}`);
            const data = await response.json();

            if (data.error) {
                setError(data.error);
                setMessage("");
            } else {
                setMessage(data.message);
                setError("");
            }
        } catch (error) {
            setError("Failed to connect to the server.");
            setMessage("");
        } 
    };

    return (
        <div style={styles.container}>
            <h1>GreetMe</h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
            />
            <button onClick={getGreeting} style={styles.button}>Get Greeting</button>
            {message && <h2 style={styles.message}>{message}</h2>}
            {error && <h2 style={styles.error}>{error}</h2>}
        </div>
    );
};

// ✅ Inline styles for a cleaner look
const styles = {
    container: {
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial, sans-serif",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        marginRight: "10px",
    },
    button: {
        padding: "10px 15px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
    },
    message: {
        color: "green",
        marginTop: "20px",
    },
    error: {
        color: "red",
        marginTop: "20px",
    },
};

export default App;