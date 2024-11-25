// import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// 1. 만든 페이지들을 import
import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";

import Login from "./pages/login.jsx";
import SignUp from './pages/signup.jsx';

import Search from './pages/search/search.jsx';
import Movies from "./pages/movies.jsx";

import NowPlaying from './pages/now-playing';
import Popular from './pages/popular';
import TopRated from './pages/top-rated';
import UpComing from './pages/up-coming';

import MovieDetails from "./movies/MovieDetail.jsx";

import RootLayout from "./layout/root-layout.jsx";

const router = createBrowserRouter([
  {
      path: '/',
      element: <RootLayout/>,
      errorElement: <NotFound/>,

      children: [
        {
            // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
            index: true,
            element: <HomePage/>
        },
        { path: 'search', element: <Search/> },
        {
            // 3. 부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작한다.
            path: 'movies',
            // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
            //path: 'movies:movieId',
            element: <Movies/>
        },
        { path: 'login', element: <Login/> },
        { path: 'signup', element: <SignUp/> },
        { path: 'now-playing', element: <NowPlaying/> },
        { path: 'popular', element: <Popular/> },
        { path: 'top-rated', element: <TopRated/> },
        { path: 'up-coming', element: <UpComing/> },
        { path: 'movies/:movieId', element: <MovieDetails/> }
    ]
  },
])

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App