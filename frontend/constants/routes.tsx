export const API_ROUTES = {
  // User
  registerUser: "/users/user/register",
  loginUser: "/users/user/login",
  verifyUser: "/users/user/verify?email=:email&code=:code",
  // dayplanner
  getDayPlanner: "/dayPlan/:dateISO",
  getImpNote: "/dayPlan/:dayPlanId/importantNote",
  updateImpNote: "dayPlan/:dayPlanId/importantNote",
};

export const ROUTES = {
  login: "/app/login",
  register: "/app/register",
  verify: "/app/verify",
  dashboard: "/app/dashboard/:dateISO",
};
