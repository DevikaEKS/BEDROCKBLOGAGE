import { useState } from "react";
import "./App.css";

function App() {
const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("Professional");
  const [blog, setBlog] = useState("");

 const generateBlog = async () => {
    if (!topic.trim()) {
        alert("Please enter a blog topic");
        return;
    }

    setLoading(true);
    setBlog("");

    try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                topic: topic,
                keywords: keywords,
                tone: tone
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to generate blog");
        }

        setBlog(data.blog);

    } catch (error) {
        console.error(error);
        alert("Failed to generate blog");
    } finally {
        setLoading(false);
    }
};

  return (

    <div className="page">

      <nav className="navbar">

        <div className="logo">
          🤖 AI Blog Studio
        </div>

        <div className="nav-links">
          <span>Home</span>
          <span>My Blogs</span>
          <span>About</span>
        </div>

      </nav>


      <section className="hero">

        <h1>
          Create Amazing Blogs with AI
        </h1>

        <p>
          Generate professional blog posts using
          Generative AI.
        </p>

      </section>


      <section className="workspace">

        <div className="card">

          <h2>Create Your Blog</h2>

          <label>Blog Topic</label>

          <input
            type="text"
            placeholder="Example: Artificial Intelligence"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />


          <label>Keywords</label>

          <input
            type="text"
            placeholder="AI, Machine Learning, Education"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />


          <label>Tone</label>

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >

            <option>Professional</option>
            <option>Friendly</option>
            <option>Technical</option>
            <option>Simple</option>

          </select>


          <button onClick={generateBlog}>

            ✨ Generate Blog

          </button>

        </div>


        <div className="card blog-card">

          <h2>Generated Blog</h2>

          {blog ? (

            <div className="blog">

              {blog}

            </div>

          ) : (

            <div className="empty">

              Your generated blog will appear here.

            </div>

          )}

        </div>

      </section>


      <footer>

        AI Blog Studio © 2026

      </footer>

    </div>

  );
}

export default App;