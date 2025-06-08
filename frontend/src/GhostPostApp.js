import React, { useState } from "react";
import axios from "axios";
import "./GhostPostApp.css";

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
    <div className="ghost-app-container">
      <div className="left-panel">
        <textarea
          placeholder="Write your code snippet here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="create-btn" onClick={handleCreate}>Create Post</button>

        {createResponse && (
          <div className={`response-box ${createResponse.error ? 'error' : ''}`}>
            {createResponse.error ? (
              <p>{createResponse.error}</p>
            ) : (
              <>
                <p><strong>URL:</strong> {createResponse.url}</p>
                <p><strong>Delete Key:</strong> {createResponse.deleteKey}</p>
                <p><em className="text-sm text-red-500">Do not lose this delete key!</em></p>
              </>
            )}
          </div>
        )}

        <input
          placeholder="Enter delete key..."
          value={deleteKey}
          onChange={(e) => setDeleteKey(e.target.value)}
        />
        <button className="delete-btn" onClick={handleDelete}>Delete Post</button>

        {deleteResponse && (
          <div className={`response-box ${deleteResponse.error ? 'error' : ''}`}>
            {deleteResponse.error ? (
              <p>{deleteResponse.error}</p>
            ) : (
              <p>{deleteResponse.message}</p>
            )}
          </div>
        )}
      </div>

      <div className="right-panel">
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            placeholder="Paste snippet URL to view..."
            value={viewUrl}
            onChange={(e) => setViewUrl(e.target.value)}
          />
          <button className="view-btn" onClick={handleView}>View</button>
        </div>

        {viewedContent && (
          <div className="response-box">
            {viewedContent.error ? (
              <p className="text-red-500">{viewedContent.error}</p>
            ) : (
              <>
                <pre>{viewedContent.content}</pre>
                <p><em>Created At:</em> {new Date(viewedContent.createdAt).toLocaleString()}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
