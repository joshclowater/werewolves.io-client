import { configureStore } from 'redux-starter-kit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV !== 'production'
});

sagaMiddleware.run(rootSaga);

export default store;

// TODO hot reloading for redux + socket.js
// export default function configureAppStore() {
//   const sagaMiddleware = createSagaMiddleware();
//   const store = configureStore({
//     reducer,
//     middleware: [sagaMiddleware],
//     devTools: process.env.NODE_ENV !== 'production'
//   });

//   if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./reducers', () => store.replaceReducer(reducer));
// //   module.hot.accept('./sagas', () => {
// //     const getNewSagas = require('./sagas');
// //     sagaTask.cancel()
// //     sagaTask.done.then(() => {
// //       sagaTask = sagaMiddleware.run(function* replacedSaga (action) {
// //         yield getNewSagas()
// //       })
// //     })
// //   })
//   }

//   sagaMiddleware.run(rootSaga);

//   return store;
// }
