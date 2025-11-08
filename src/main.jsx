import React from 'react'
import {store } from './redux/store.js'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './components/ThemeProvider.jsx';
import './index.css'
import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <ThemeProvider>
//       <BrowserRouter>
//         <App/>
//       </BrowserRouter>
//     </ThemeProvider>
//   </StrictMode>,
// )






const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)

  root.render(
    <Provider store={store}>
       <ThemeProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ThemeProvider>
    </Provider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}