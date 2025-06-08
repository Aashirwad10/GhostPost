import React, { useState } from "react";
import axios from "axios";
import "./GhostPostApp.css"; // <-- include the CSS file

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
    <div className="container">
      <div className="left">
        <h2>Create Snippet</h2>
        <textarea
          className="input-area"
          placeholder="Write your code snippet here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="btn create-btn" onClick={handleCreate}>
          Create Post
        </button>

        {createResponse && (
          <div className="response-box">
            {createResponse.error ? (
              <p className="error-text">{createResponse.error}</p>
            ) : (
              <div>
                <p><strong>URL:</strong> {createResponse.url}</p>
                <p><strong>Delete Key:</strong> {createResponse.deleteKey}</p>
                <p className="warning-text">Do not lose this delete key!</p>
              </div>
            )}
          </div>
        )}

        <h3>Delete Snippet</h3>
        <input
          className="input-field"
          placeholder="Enter delete key..."
          value={deleteKey}
          onChange={(e) => setDeleteKey(e.target.value)}
        />
        <button className="btn delete-btn" onClick={handleDelete}>
          Delete Post
        </button>

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

      <div className="right">
        <h2>View Snippet</h2>
        <div className="view-box">
          <input
            className="input-field"
            placeholder="Paste snippet URL to view..."
            value={viewUrl}
            onChange={(e) => setViewUrl(e.target.value)}
          />
          <button className="btn view-btn" onClick={handleView}>
            View
          </button>
        </div>

        {viewedContent && (
          <div className="response-box">
            {viewedContent.error ? (
              <p className="error-text">{viewedContent.error}</p>
            ) : (
              <>
                <pre className="snippet-view">{viewedContent.content}</pre>
                <p className="meta-text">
                  Created At: {new Date(viewedContent.createdAt).toLocaleString()}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
