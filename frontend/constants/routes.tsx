export const API_ROUTES = {
  // User
  registerUser: "/users/user/register",
  loginUser: "/users/user/login",
  verifyUser: "/users/user/verify?email=:email&code=:code",
  // dayplanner
  getDayPlanner: "/dayPlan/:dateISO",
  getImpNote: "/dayPlan/:dateISO/importantNote",
  updateImpNote: "dayPlan/:dateISO/importantNote",
  updateSides: "dayPlan/:dateISO/sides",
  updatePriorities: "dayPlan/:dateISO/priorities",
  updateTT: "dayPlan/:dateISO",
  // quicknote
  getQN: "/quickNote",
  updateQN: "/quickNote/:dateISO",
  // files
  getFiles: "/users/user/files",
  uploadFile: "/users/user/file",
  deleteFile: "/users/user/file/:fileId",
};

export const ROUTES = {
  login: "/app/login",
  register: "/app/register",
  verify: "/app/verify",
  dashboard: "/app/dashboard/:dateISO",
};
