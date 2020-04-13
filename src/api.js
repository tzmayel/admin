const loadApiData = (page, recordsPerPage) => {
  const sendDate = new Date().getTime();
  let responseTimeMs = 0;
  return fetch(
    `http://localhost:3001/api/subscribers/${page}/${recordsPerPage}`
  )
    .then((res) => {
      // console.log('res=', res);
      const receiveDate = new Date().getTime();
      responseTimeMs = receiveDate - sendDate;

      if (res.status === 200) {
        return res.json();
      }

      return {
        records: null,
        debugInfo: {
          totalRecordsCount: 0,
        },
      };
    })
    .then((data) => {
      // console.log('data=', data);
      return {
        records: data.records,
        totalDbRecords: data.debugInfo.totalRecordsCount,
        responseTime: responseTimeMs,
      };
    })
    .catch((e) => {
      throw e;
    });
};

export default {
  loadApiData,
};
