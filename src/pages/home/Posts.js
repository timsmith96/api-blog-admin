import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    requestPosts();
  }, []);

  async function requestPosts() {
    const res = await fetch('http://localhost:4000/posts');
    const json = await res.json();
    setPosts(json);
  }

  return (
    <div>
      <ul>
        <h1>Posts</h1>
        {posts.map((post) => (
          <Link key={post._id} to={`/posts/${post._id}`}>
            {post.title}
          </Link>
        ))}
      </ul>
      <Link to="/newpost">new post</Link>
    </div>
  );
}
