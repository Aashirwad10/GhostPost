import React, { useState } from "react";
import axios from "axios";
import "./GhostPostApp.css"; // make sure to import your CSS

export default function GhostPostApp() {
  const [content, setContent] = useState("");
  const [createResponse, setCreateResponse] = useState(null);
  const [deleteKey, setDeleteKey] = useState("");
  const [deleteResponse, setDeleteResponse] = useState(null);
  const [viewUrl, setViewUrl] = useState("");
  const [viewedContent, setViewedContent] = useState(null);

  const handleCreate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/snippets", { content });
      setCreateResponse(res.data);
    } catch (err) {
      setCreateResponse({ error: "Failed to create post." });
    }
  };

  const handleDelete = async () => {
    try {
      const id = new URL(createResponse?.url).pathname.split("/").pop();
      const res = await axios.delete(`http://localhost:5000/api/snippets/${id}`, {
        data: { deleteKey }
      });
      setDeleteResponse(res.data);
    } catch (err) {
      setDeleteResponse({ error: "Failed to delete post." });
    }
  };

  const handleView = async () => {
    try {
      const id = new URL(viewUrl).pathname.split("/").pop();
      const res = await axios.get(`http://localhost:5000/api/snippets/${id}`);
      setViewedContent(res.data);
    } catch (err) {
      setViewedContent({ error: "Post not found." });
    }
  };

  return (
    <div className="ghost-post-app">
      <div className="left-panel">
        <textarea
          placeholder="Write your code snippet here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={handleCreate}>🚀 Create Post</button>

        {createResponse && (
          <div className="response-box">
            {createResponse.error ? (
              <p className="error-text">{createResponse.error}</p>
            ) : (
              <>
                <p><strong>URL:</strong> {createResponse.url}</p>
                <p><strong>Delete Key:</strong> {createResponse.deleteKey}</p>
                <p className="warning-text">⚠️ Don't lose this delete key!</p>
              </>
            )}
          </div>
        )}

        <input
          placeholder="Enter delete key..."
          value={deleteKey}
          onChange={(e) => setDeleteKey(e.target.value)}
        />
        <button className="delete-btn" onClick={handleDelete}>🗑️ Delete Post</button>

        {deleteResponse && (
          <div className="response-box">
            {deleteResponse.error ? (
              <p className="error-text">{deleteResponse.error}</p>
            ) : (
              <p>{deleteResponse.message}</p>
            )}
          </div>
        )}
      </div>

      <div className="right-panel">
        <div className="view-controls">
          <input
            placeholder="Paste snippet URL to view..."
            value={viewUrl}
            onChange={(e) => setViewUrl(e.target.value)}
          />
          <button onClick={handleView}>👁️ View</button>
        </div>

        {viewedContent && (
          <div className="view-box">
            {viewedContent.error ? (
              <p className="error-text">{viewedContent.error}</p>
            ) : (
              <>
                <pre>{viewedContent.content}</pre>
                <p className="timestamp">🕒 {new Date(viewedContent.createdAt).toLocaleString()}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
