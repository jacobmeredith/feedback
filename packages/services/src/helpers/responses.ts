const responseOk = (body = {}) => {
  return {
    statusCode: 200,
    body: JSON.stringify(body)
  }
};

const responseNotOk = ({body = {}, message = ''}: {body?: any, message?: string}) => {
  const res = {...body, message};

  return {
    statusCode: 500,
    body: JSON.stringify(res)
  }
};

export {responseOk, responseNotOk};
