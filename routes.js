const fs = require('fs');

const requestHandler = (req, res) => {
    const { url, method } = req;
    if (url === '/') {
        res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Form Page</title>
                </head>
                <body>
                    <form action="/message" method="POST">   
                        <input type="text" name="message" id="message">
                        <input type="submit" value="Send">
                    </form>
                </body>
                </html>`);
        return res.end();
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message = parseBody.split('=')[1];

            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from nodejs.</h1></body>');
    res.write('<html>');
    res.end();
};

module.exports = requestHandler;
