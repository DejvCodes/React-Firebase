import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SharedLayout from "./pages/SharedLayout"
import AllSneakers from "./pages/AllSneakers"
import Form from "./pages/Form"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      { index: true, element: <AllSneakers /> },
      { path: "form", element: <Form /> },
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App