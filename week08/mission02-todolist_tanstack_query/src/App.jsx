// src/App.jsx

// import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// 1. 만든 페이지들을 import
import HomePage from "./pages/home.jsx";
import TodoDetail from './todos/TodoDetail';

const router = createBrowserRouter([
  {
      path: '/',
      // element: <RootLayout/>,
      // errorElement: <NotFound/>,

      children: [
        {
            // index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
            index: true,
            // path: 'todo',
            element: <HomePage/>
        },
        { path: 'todo/:todoId', element: <TodoDetail/> }
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