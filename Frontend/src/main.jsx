import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './store/store'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={<div className="spinner" />} persistor={persistor}>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </PersistGate>
    </Provider>
  </BrowserRouter>
)









// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import { Toaster } from 'react-hot-toast'
// import { Provider } from 'react-redux'
// import { store } from './store/store'  // your redux store

// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <Provider store={store}>   {/* Redux provider */}
//       <App />
//       <Toaster 
//         position="top-right"
//         toastOptions={{
//           duration: 4000,
//           style: {
//             background: '#363636',
//             color: '#fff',
//           },
//         }}
//       />
//     </Provider>
//   </BrowserRouter>
// )
