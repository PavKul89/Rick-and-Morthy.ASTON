export const loggerMiddleware = (next) => (action) => {
  next(action)
}
