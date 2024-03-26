export const BASE_URL = 'https://localhost:7148/api/v1/';

// Authentication
export const AUTH_LOGIN_URL = 'account/login';
export const AUTH_REGISTER_URL = 'account/register';

// User
export const GET_ALL_USERS_URL = 'user/all';
export const GET_USER_BY_ID_URL = 'user/single';
export const ADD_USER_URL = 'user/add';
export const GET_SEVERAL_USERS_BY_IDS_URL = 'user/several';

// Project
export const GET_USER_PROJECTS_URL = 'project/userprojects';
export const GET_PROJECT_BY_ID = (projectId) => `project/${projectId}`;
export const ADD_PROJECT_URL = 'project/add';