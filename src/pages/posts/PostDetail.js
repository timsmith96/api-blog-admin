import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PostDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postText, setpostText] = useState();
  const [postTitle, setpostTitle] = useState();
  const [display, setDisplay] = useState();
  useEffect(() => {
    requestPost();
  }, []);

  async function requestPost() {
    const res = await fetch(`http://localhost:4000/posts/${id}`);
    const json = await res.json();
    setPost(json);
    setpostText(json.text);
    setpostTitle(json.title);
    setDisplay(json.display);
    setLoading(false);
  }

  const handleDelete = async () => {
    await fetch(`http://localhost:4000/posts/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    navigate('/');
    console.log('deleted successfully');
  };

  const handleChange = (e) => {
    setpostText(e.target.value);
  };

  const handleTitleChange = (e) => {
    setpostTitle(e.target.value);
  };

  const handleDisplayChange = (e) => {
    setDisplay(true);
  };

  const handleNoDisplayChange = (e) => {
    setDisplay(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:4000/posts/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: postText,
        title: postTitle,
        display: display,
      }),
    });
    navigate('/');
  };

  const handleCommentClick = async (e) => {
    await fetch(`http://localhost:4000/comments/${e.target.value}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    window.location.reload();
  };

  const { user, comments, createdAt } = post;

  if (loading) {
    return <h2>loading</h2>;
  }

  return (
    <div>
      <h1>Post detail</h1>
      <p>created by:</p>
      {user.username}
      <p>comments:</p>
      {comments.map((comment) => (
        <div>
          <p key={comment._id}>{comment.text}</p>
          <button value={comment._id} onClick={handleCommentClick}>
            delete comment
          </button>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <p>title:</p>
        <input type="text" value={postTitle} onChange={handleTitleChange} />
        <p>text:</p>
        <textarea
          rows="20"
          cols="50"
          type="text"
          value={postText}
          onChange={handleChange}
        ></textarea>
        <fieldset>
          <input
            type="radio"
            id="display"
            name="display"
            checked={display === true}
            onChange={handleDisplayChange}
          />
          <label htmlFor="display">display</label>
          <input
            type="radio"
            id="don't-display"
            name="display"
            checked={display === false}
            onChange={handleNoDisplayChange}
          />
          <label htmlFor="don't-display">don't display</label>
        </fieldset>

        <button type="submit">Edit post</button>
      </form>
      <p>created at:</p> {createdAt}
      <button onClick={handleDelete}>Delete post</button>
    </div>
  );
}
