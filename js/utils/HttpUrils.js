export default class HttpUrils {
    static get(url) {
        return new Promise((resolve, reject) => {
                fetch(url)
                    .then(response => response.json()) //注意一定要加括号
                    .then(result => {
                        resolve(result)
                    }).catch(error => {
                    reject(error)
                })
            }
        )
    }

    static post(url, data) {  //不成功的话，data传let formData = new FormData();
        return new Promise((resolve, reject) => {
            fetch(url,
                {
                    method: 'POST',
                    header:
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                    body: JSON.stringify(data)  //data
                }).then(response => response.json()) //注意一定要加括号
                .then(result => {
                    resolve(result)
                }).catch(error => {
                reject(error)
            })
        })
    }
}
