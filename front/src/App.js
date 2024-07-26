import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [code, setCode] = useState('');
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setIsSuccess(false);
        setErrorMessage('');

        try {
            const response = await axios.post('https://localhost:7102/api/CodeProcessor', { code });
            setData(response.data);
            setIsSuccess(true);
        } catch (error) {
            console.error('Error processing  :', error);
            setErrorMessage('  error  .');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Code Processor</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Code:
                        <textarea value={code} onChange={(e) => setCode(e.target.value)} />
                    </label>
                    <button type="submit">Submit</button>
                </form>

                {isLoading && <p>Processing your request...</p>}
                {isSuccess && <p>Code processed successfully!</p>}
                {errorMessage && <p>{errorMessage}</p>}

                {/* Afficher les données ici */}
                <div>
                    <h2>Data:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            </header>
        </div>
    );
}

export default App;
