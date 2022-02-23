import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { counterSlice } from './slices/CounterSlice';
import { departmentSlice } from './slices/DepartmentSlice';
import { professorSlice } from './slices/ProfessorSlice';
import { studentSlice } from './slices/StudentSlice';

const logger = createLogger();

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        department: departmentSlice.reducer,
        professor: professorSlice.reducer,
        student: studentSlice.reducer
    },

    middleware: [...getDefaultMiddleware({serializableCheck: false}), logger],
    devTools: true
})

export default store;