import https from 'https';

export default async (cep: string): Promise<any> => {
  return await new Promise((resolve, reject) =>
    https
      .get(`https://viacep.com.br/ws/${cep}/json/`, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          resolve(JSON.parse(data));
        });
      })
      .on('error', (err) => {
        reject('Error: ' + err.message);
      }),
  );
};
