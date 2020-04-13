const loadApiData = (page, recordsPerPage, callback) => {
  const sendDate = new Date().getTime();
  let responseTimeMs = 0;
  fetch(`http://localhost:3001/api/subscribers/${page}/${recordsPerPage}`)
    .then((res) => {
      const receiveDate = new Date().getTime();
      responseTimeMs = receiveDate - sendDate;

      if (res.status === 200) {
        return res.json();
      }

      callback({
        rowData: null,
        responseTime: responseTimeMs,
      });
      return null;
    })
    .then((res) => {
      if (res) {
        callback({
          rowData: res.records,
          totalDbRecords: res.debugInfo.totalRecordsCount,
          responseTime: responseTimeMs,
        });
      }
    })
    .catch(() => {
      // console.log('e=', e);
    });
};

export default {
  loadApiData,
};
