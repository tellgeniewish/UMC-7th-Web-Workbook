import './App.css'
import CustomButton from "./components/custom-button.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

// 1. 만든 페이지들을 import
import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import Movies from "./pages/movies.jsx";

import RootLayout from "./layout/root-layout.jsx";

const router = createBrowserRouter([
  {
      path: '/',
      //<h1>홈 페이지입니다.</h1>,
      //element: <HomePage/>,
      element: <RootLayout/>,

      // 없는 경로에 들어온 처리를 해줍니다.
      //<h1>너는 없는 경로에 들어왔다 ^ㅁ^ 야호~!</h1>
      errorElement: <NotFound/>,
      // 1. Navbar 밑에 path에 해당하는 element를 보여주고 싶으면 아래와 같이 children을 활용
      children: [
        {
            // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
            index: true,
            element: <HomePage/>
        },
        {
            // 3. 부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작한다.
            //path: 'movies',
            // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
            path: 'movies/:movieId',
            element: <Movies/>
        }
    ]
  },
  /*{
    path: '/movies',
    //<h1>영화 페이지 입니다.</h1>
    element: <Movies/>
  }*/
])

function App() {
  return <RouterProvider router={router}/>
  /*return (
    <>
      <CustomButton/>
    </>
  )*/
}

export default App
