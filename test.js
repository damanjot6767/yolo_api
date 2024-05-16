const mailjet = require('node-mailjet')
    .connect("7ac9fa6ec5ad850435b41d5b26a91d56", 'bc6231da47ea7ab62af8d3e0829ce641');

const request = mailjet
    .post("send", { 'version': 'v3.1' })
    .request({
        "Messages": [
            {
                "From": {
                    "Email": "noreply@devronins.com",
                    "Name": "STMINA"
                },
                "To": [
                    {
                        "Email": "laxman@devronins.com",
                        "Name": "Laxman"
                    }
                ],
                "TemplateID": 3817703,
                "TemplateLanguage": true,
                "Subject": "Test email",
                "Variables": {}
            }
        ]
    })
request
    .then((result) => {
        console.log(JSON.stringify(result))
    })
    .catch((err) => {
        console.log(err.statusCode)
    })
