import './App.css';
import Posts from './pages/home/Posts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostDetail from './pages/posts/PostDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
