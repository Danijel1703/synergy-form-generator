function inject(Component: any, StoreClass: any, props?: any) {
  const initializedStore = new StoreClass();
  return <Component store={initializedStore} {...props} />;
}
export default inject;
