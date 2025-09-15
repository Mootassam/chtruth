export default (app) => {
  app.post(
    `/file/upload`,
    require('./162.213.249.168/upload').default,
  );
  app.get(
    `/file/download`,
    require('./162.213.249.168/download').default,
  );
  app.get(
    `/tenant/:tenantId/file/credentials`,
    require('./credentials').default,
  );
};
