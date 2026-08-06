import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
export const runtime = 'edge'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth' 
import { auth } from '@clerk/nextjs/server'
import { HTTPException } from 'hono/http-exception'
import accounts from "./accounts";
import  categories  from './categories';
import transactions from './transactions';
import summary from "./summary";

const app = new Hono().basePath('/api');

// app.onError((err,c) =>{
//     if(err instanceof HTTPException){
//         return err.getResponse();
//     }
//     return c.json({error:"Internal error"},500);
// })
// app
//     .get(
//         '/hello', 
//         clerkMiddleware(),
//         (c) => {
//             try{
//             const auth =getAuth(c);

//             if(!auth?.userId){
//                 return c.json({error:"Unauthorised"});
//             }
//     return c.json({
//         message: 'Hello Next.js!',
//         userId:auth.userId,
//     });
// }
//     catch(error){
//         console.error("Error :",error);
//         return c.json({
//             error:'Internal Servwer Error'
//         },500);
//     }
//     })

//     .get(
//         "/hello/:test",
//         zValidator("param",z.object({
//             test: z.string(),
//         })),
//         (c) =>{
//         const {test} =c.req.valid("param");
//         return c.json({
//             message: "Hello World",
//             test:test,
//         })
//     })

//     .post(
//         "/",
//         zValidator("json",z.object({
//             name :z.string(),
//             userId: z.number(),
//         })),
//         zValidator("param",z.object({
//             postId: z.number(),
//         })),
//         (c) =>{
//             const {name,userId} =c.req.valid("json");
//             const {postId} =c.req.valid("param");
//             return c.json({});
//         }
//     )
const routes = app
    .route("/summary",summary)
    .route("/accounts",accounts)
    .route("/categories",categories)
    .route("/transactions",transactions) /*order of chaining these routes matter if they have same names but here they have different names so it would not matter here*/

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

//we overwrite the nextjs route handlers by handlers
//GET,POST are route handlers and they call app here
//which calls app, check above that const app, it is an object to to hono here

export type AppType = typeof routes;