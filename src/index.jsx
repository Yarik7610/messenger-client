import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { store } from './Redux/store'
import { SocketProvider } from './contexts/SocketProvider'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
)
