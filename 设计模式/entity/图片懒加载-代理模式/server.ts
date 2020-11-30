import Koa from 'koa';
import Router from 'koa-router';
import Static from "koa-static";
import path from "path";
import fs from "fs";

const app = new Koa();

app.use(Static(path.join(__dirname, "./images")));


const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = await new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "./图片懒加载.html"), "utf-8", (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res.toString());
        });
    })
});

router.get("/images/:name", async ctx => {
    ctx.body = await new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, `./images/${ctx.params.name}`), (err, res) => {
            if (err) {
                reject(err)
            }

            setTimeout(() => {

                resolve(res);
            }, 1000)
        });
    })
})

app.use(router.routes());

app.listen(3000);

console.log('Server running on port 3000');
