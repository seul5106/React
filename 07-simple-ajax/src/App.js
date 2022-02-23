import React from 'react';

import styled from 'styled-components';
import { Route, NavLink, Routes } from "react-router-dom";

import DepartmentAdd from './pages/DepartmentAdd';
import DepartmentList from './pages/DepartmentList';

import ProfessorAdd from './pages/ProfessorAdd';
import ProfessorList from './pages/ProfessorList';

import StudentAdd from './pages/StudentAdd';
import StudentList from './pages/StudentList';

const MenuLink = styled(NavLink)`
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
    padding-bottom: 2px;
    color: #222;

    &:hover {
        color: #22b8cf;
    }

    &:after {
        content: '|';
        display: inline-block;
        padding: 0 7px;
        color: #ccc;
    }

    &:last-child {
        &:after {
            color: #fff;
        }
    }

    &.active {
        text-decoration: underline;
        color: #22b8cf;
        &:after {
            border-bottom: 4px solid #fff !important;
        }
    }
`;

//json-server myschool.json --port=3001
//json-server는 단일행 조회밖에 안된다.

function App() {
    return (
        <div>
            <h1>07-Simple-Ajax</h1>

            <nav>
                <MenuLink to='/department_list'>학과목록</MenuLink>
                <MenuLink to='/professor_list'>교수목록</MenuLink>
                <MenuLink to='/student_list'>학생목록</MenuLink>
            </nav>

            <hr />

            {/** 라우트는 app.js에만 걸어놓고 링크만 딴곳으로 옮깁*/}
            <Routes>
                <Route path='/' element={<DepartmentList />} />
                <Route path='/department_list' element={<DepartmentList />} />
                <Route path='/department_add' element={<DepartmentAdd />} />
                <Route path='/professor_list' element={<ProfessorList />} />
                <Route path='/professor_add' element={<ProfessorAdd />} />
                <Route path='/student_list' element={<StudentList />} />
                <Route path='/student_add' element={<StudentAdd />} />
            </Routes>
        </div>
    );
}

export default App;
