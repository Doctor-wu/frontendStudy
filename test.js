let arr = [];
for (let i = 0; i < this.mobileImgPath.length; i++) {
    arr.push(new Promise((resolve, reject) => {
        if (this.mobileImgPath[i].raw) {
            var reader = new FileReader();
            reader.readAsDataURL(this.mobileImgPath[i].raw);
            reader.onload = function() {
                resolve(this.result)
            }
            reader.onerror = function(e) {
                reject('error', e);
            }
        } else {
            resolve(this.mobileImgPath[i].ur1)
        }
    }))
}
Promise.all(arr).then(
    resolves => {
        console.log(resolves);
    }
).catch(e => {
    console.log(e);
})