import { useState } from 'react';
import './App.css';
import InstagramFeed from './InstagramFeed';

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
        <div className="container" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
           <div style={{ flex: 1, width: "50%" }}>
      <h4>My Instagram Feed</h4>
      <InstagramFeed />
    </div>
            <div>
                <h2>Notion Sync Widget</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <input
                        type="text"
                        placeholder="e.g., Meeting with client"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Date & Time
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description
                    <textarea
                        placeholder="Details (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <button type="submit">Sync to Notion</button>
            </form>
            {result && <p className="result">{result}</p>}
            </div>
        </div>
    );
}

export default App;
