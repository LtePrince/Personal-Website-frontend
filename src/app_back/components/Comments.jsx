import React, { useState } from 'react';
import './Comments.css';

export default function Comments({ blogID, isDarkMode }) {
  const [comments, setComments] = useState([
    { text: '很棒的文章，学到了很多！', time: '2025-05-18 10:00:00' },
    { text: '期待更多精彩内容！', time: '2025-05-18 11:30:00' }
  ]);
  const [input, setInput] = useState('');

  // 获取评论（可扩展为后端请求）
  // useEffect(() => {
  //   fetch(`/api/comments?blogID=${blogID}`)
  //     .then(res => res.json())
  //     .then(data => setComments(data));
  // }, [blogID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // 这里可扩展为后端提交
    setComments([...comments, { text: input, time: new Date().toLocaleString() }]);
    setInput('');
  };

  return (
    <div className={`comments-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <p style={{ fontSize: '1.5em' }}>comments</p>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write down your comments..."
          rows={3}
        />
        <button type="submit">Comment</button>
      </form>
      <ul className="comment-list">
        {comments.map((c, i) => (
          <li key={i}>
            <div className="comment-text">{c.text}</div>
            <div className="comment-time">{c.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}