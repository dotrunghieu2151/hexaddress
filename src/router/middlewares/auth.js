export default function auth({ next, context }) {
  if (context.store && !context.store.getters['user/token']) {
    return next({ name: 'login' });
  }
  return next();
}