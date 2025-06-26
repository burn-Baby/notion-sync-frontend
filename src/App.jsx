import { useState } from 'react';
import './App.css';

function App() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [result, setResult] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("https://notion-sync-backend.vercel.app/api/add-task", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, date, description })
        });
        const data = await res.json();
        setResult(data.message || data.error);
    };

    return (
        <div className="container">
            <h2>Notion Sync Widget</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                <button type="submit">Sync to Notion</button>
            </form>
            <p>{result}</p>
        </div>
    );
}

export default App;
