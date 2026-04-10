16:30:18.754 Running build in Washington, D.C., USA (East) – iad1
16:30:18.754 Build machine configuration: 2 cores, 8 GB
16:30:18.955 Cloning github.com/alvaroraulcastro/piscinasMundoFibra (Branch: dev, Commit: a7b9cf5)
16:30:19.505 Cloning completed: 550.000ms
16:30:20.556 Restored build cache from previous deployment (2yJdY7MAGyHYCD8a8yr8y13Cyani)
16:30:21.052 Running "vercel build"
16:30:21.705 Vercel CLI 50.42.0
16:30:21.954 Running "install" command: `npm install`...
16:30:23.020 npm warn ERESOLVE overriding peer dependency
16:30:23.022 npm warn While resolving: @auth/core@0.41.0
16:30:23.022 npm warn Found: nodemailer@7.0.13
16:30:23.023 npm warn node_modules/nodemailer
16:30:23.023 npm warn   nodemailer@"^7.0.13" from the root project
16:30:23.023 npm warn   2 more (@auth/core, next-auth)
16:30:23.024 npm warn
16:30:23.024 npm warn Could not resolve dependency:
16:30:23.024 npm warn peerOptional nodemailer@"^6.8.0" from @auth/core@0.41.0
16:30:23.024 npm warn node_modules/next-auth/node_modules/@auth/core
16:30:23.025 npm warn   @auth/core@"0.41.0" from next-auth@5.0.0-beta.30
16:30:23.025 npm warn   node_modules/next-auth
16:30:23.025 npm warn
16:30:23.025 npm warn Conflicting peer dependency: nodemailer@6.10.1
16:30:23.025 npm warn node_modules/nodemailer
16:30:23.026 npm warn   peerOptional nodemailer@"^6.8.0" from @auth/core@0.41.0
16:30:23.026 npm warn   node_modules/next-auth/node_modules/@auth/core
16:30:23.026 npm warn     @auth/core@"0.41.0" from next-auth@5.0.0-beta.30
16:30:23.026 npm warn     node_modules/next-auth
16:30:31.745 
16:30:31.745 > piscinas-mundo-fibra@0.1.0 postinstall
16:30:31.745 > prisma generate
16:30:31.745 
16:30:32.457 warn The configuration property `package.json#prisma` is deprecated and will be removed in Prisma 7. Please migrate to a Prisma config file (e.g., `prisma.config.ts`).
16:30:32.458 For more information, see: https://pris.ly/prisma-config
16:30:32.458 
16:30:32.737 Prisma schema loaded from prisma/schema.prisma
16:30:32.978 ┌─────────────────────────────────────────────────────────┐
16:30:32.979 │  Update available 6.19.3 -> 7.7.0                       │
16:30:32.979 │                                                         │
16:30:32.980 │  This is a major update - please follow the guide at    │
16:30:32.980 │  https://pris.ly/d/major-version-upgrade                │
16:30:32.980 │                                                         │
16:30:32.980 │  Run the following to update                            │
16:30:32.980 │    npm i --save-dev prisma@latest                       │
16:30:32.980 │    npm i @prisma/client@latest                          │
16:30:32.980 └─────────────────────────────────────────────────────────┘
16:30:32.981 
16:30:32.981 ✔ Generated Prisma Client (v6.19.3) to ./node_modules/@prisma/client in 93ms
16:30:32.981 
16:30:32.981 Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
16:30:32.981 
16:30:32.982 Tip: Want to turn off tips and other hints? https://pris.ly/tip-4-nohints
16:30:32.982 
16:30:33.001 
16:30:33.002 added 55 packages, and audited 409 packages in 11s
16:30:33.002 
16:30:33.003 154 packages are looking for funding
16:30:33.003   run `npm fund` for details
16:30:33.014 
16:30:33.014 4 vulnerabilities (3 low, 1 moderate)
16:30:33.015 
16:30:33.015 To address all issues possible (including breaking changes), run:
16:30:33.015   npm audit fix --force
16:30:33.015 
16:30:33.016 Some issues need review, and may require choosing
16:30:33.017 a different dependency.
16:30:33.017 
16:30:33.017 Run `npm audit` for details.
16:30:33.051 Detected Next.js version: 16.2.3
16:30:33.052 Running "next build"
16:30:33.743 ▲ Next.js 16.2.3 (Turbopack)
16:30:33.744 
16:30:33.752 ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
16:30:33.790   Creating an optimized production build ...
16:30:46.283 ✓ Compiled successfully in 12.2s
16:30:46.285   Running TypeScript ...
16:30:52.697   Finished TypeScript in 6.4s ...
16:30:52.698   Collecting page data using 1 worker ...
16:30:53.231 ⚠ Using edge runtime on a page currently disables static generation for that page
16:30:53.365   Generating static pages using 1 worker (0/14) ...
16:30:53.400   Generating static pages using 1 worker (3/14) 
16:30:53.520   Generating static pages using 1 worker (6/14) 
16:30:53.524   Generating static pages using 1 worker (10/14) 
16:30:57.282 ✓ Generating static pages using 1 worker (14/14) in 3.9s
16:30:57.299   Finalizing page optimization ...
16:30:57.352   Running onBuildComplete from Vercel
16:30:57.506 Detected .env file, it is strongly recommended to use Vercel's env handling instead
16:30:57.581 
16:30:57.584 Route (app)
16:30:57.584 ┌ ○ /
16:30:57.585 ├ ○ /_not-found
16:30:57.585 ├ ƒ /admin
16:30:57.585 ├ ƒ /admin/catalog
16:30:57.585 ├ ƒ /admin/config
16:30:57.585 ├ ƒ /admin/email
16:30:57.585 ├ ○ /admin/login
16:30:57.585 ├ ƒ /admin/orders
16:30:57.585 ├ ƒ /admin/orders/[id]
16:30:57.585 ├ ƒ /admin/orders/[id]/print
16:30:57.586 ├ ƒ /admin/reports
16:30:57.586 ├ ƒ /admin/seo
16:30:57.586 ├ ƒ /admin/users
16:30:57.586 ├ ƒ /api/admin/catalog
16:30:57.586 ├ ƒ /api/admin/config
16:30:57.586 ├ ƒ /api/admin/email-templates
16:30:57.586 ├ ƒ /api/admin/reports
16:30:57.586 ├ ƒ /api/admin/seo
16:30:57.586 ├ ƒ /api/admin/users
16:30:57.586 ├ ƒ /api/admin/users/[id]
16:30:57.586 ├ ƒ /api/auth/[...nextauth]
16:30:57.586 ├ ƒ /api/catalog
16:30:57.586 ├ ƒ /api/orders
16:30:57.586 ├ ƒ /api/orders/[id]
16:30:57.587 ├ ƒ /opengraph-image
16:30:57.587 ├ ○ /robots.txt
16:30:57.587 ├ ○ /sitemap.xml
16:30:57.587 └ ƒ /twitter-image
16:30:57.587 
16:30:57.587 
16:30:57.587 ƒ Proxy (Middleware)
16:30:57.587 
16:30:57.587 ○  (Static)   prerendered as static content
16:30:57.587 ƒ  (Dynamic)  server-rendered on demand
16:30:57.587 
16:30:57.978 Build Completed in /vercel/output [36s]
16:30:58.365 Deploying outputs...
16:31:06.245 /var/task/sandbox.js:999
16:31:06.246 `))}function wyr(e,t){return Cyr.default.trace("findFilesByPattern",{tags:{pattern:e,rootPath:t}},async()=>await new Promise((n,a)=>{(0,Tyr.default)(e,{cwd:t,nodir:!0,dot:!0},(s,l)=>{if(s)return a(s);n(l.map(p=>yee.default.join(t,p)))})}))}async function Pyr(e,t){if(!t)return;let n=await wyr("**/yarn.lock",e);for(let s of n)await Ayr(s,t);let a=await wyr("**/package-lock.json",e);for(let s of a)await Eyr(s,t)}function Iyr(builderPath,builderNameToRequire){let pkg=eval("require")(yee.default.join(builderPath,"node_modules",builderNameToRequire,"package.json"));return{exports:eval("require")(yee.default.join(builderPath,"node_modules",builderNameToRequire)),pkg,version:pkg.version}}var hxi=_r(require("@vercel/edge-functions-bridge")),gxi=_r(require("@vercel/edge-functions-bridge-latest"));var Cmt=_r(require("node:util")),vee=_r(require("node:path")),Nyr=_r(require("node:os")),bee=_r(require("node:fs"));var wmt=eval("require");function Tmt(e){let t=_xi(e.packageName),n=null,a=()=>{let s=vee.default.dirname(require.resolve(e.packageName)),l=vee.default.resolve(s,"package.json"),p=bee.default.readFileSync(l,"utf8"),{version:_}=JSON.parse(p);return _};return{version:()=>n||(n=a()),resolve(s){let l=s?vee.default.join(e.packageName,s):e.packageName;return bee.default.existsSync(t)?wmt.resolve(vee.default.join(t,"node_modules",l)):wmt.resolve(l)},require(){try{let{exports:s}=Iyr(t,e.packageName);return e.validate?.(s),s}catch(s){if((e.envVarName==="VERCEL_NODE_BRIDGE_PKG"||e.envVarName==="VERCEL_EDGE_FUNCTIONS_BRIDGE_PKG")&&process.env[e.envVarName])throw new Error(`Require of ${e.packageName} failed ${Cmt.default.format(s)}`);bee.default.existsSync(t)&&on.warn(`falling back to the preinstalled ${e.packageName} due to: ${Cmt.default.format(s)}`)}return e.preinstalled},requireRelative(s){let l=this.resolve(s);return wmt(l)},async install(s=process.env){let l=s[e.envVarName];!await(l?bee.default.existsSync(t):Promise.resolve(!0))&&l&&(on.log(`installing ${e.packageName} ${l} into ${t}`),await g7e(l,t))}}}function _xi(e){let t=e.replace(/@/g,"").replace(/\//g,"__");return bee.default.existsSync("/vercel")?`/vercel/.${t}`:vee.default.join(Nyr.default.tmpdir(),`.${t}`)}var yxi=Tmt({envVarName:"VERCEL_EDGE_FUNCTIONS_BRIDGE_PKG",packageName:"@vercel/edge-functions-bridge",preinstalled:hxi,validate:Oyr}),vxi=Tmt({envVarName:"VERCEL_EDGE_FUNCTIONS_BRIDGE_PKG",packageName:"@vercel/edge-functions-bridge-latest",preinstalled:gxi,validate:Oyr});function See(e){return e&&!process.env.VERCEL_EDGE_FUNCTIONS_BRIDGE_PKG?vxi:yxi}function Oyr(e){if(!e||typeof e!="object")throw new Error("edge-functions-bridge is in the wrong format");let t=e;if(typeof t.version!="string"||typeof t.getEdgeFunctionSourceForFileSystem!="function"||typeof t.getWorkerSource!="function"||typeof t.stringifySourceMap!="function"||typeof t.getBinarySourcemapFile!="function")throw new Error("edge-functions-bridge is in the wrong format")}var fPe=require("url"),GCr=_r(require("util"));var Svr=_r(Yke()),tDe=_r(require("dd-trace")),xvr=require("dd-trace/ext");var yvr=e=>typeof e=="object"&&e!==null,mV=e=>{if(!yvr(e))return!1;if(e instanceof Error)return!0;for(;e;){if(Object.prototype.toString.call(e)==="[object Error]")return!0;e=Object.getPrototypeOf(e)}return!1},Pk=e=>mV(e)&&"code"in e,kee=e=>yvr(e)&&"message"in e;var Avr=_r(cu());var eDe=require("timers");function $mt(e){let t,n=new Promise(a=>{t=(0,eDe.setTimeout)(a,e)});return n.cancel=()=>{(0,eDe.clearTimeout)(t)},n}var vvr=`vercel-build-container/${For()}`,f3i="hvi_lhr1_dizzy";function d3(e,t,n){if(!e?.builds)return{};let a=DN("VERCEL_HIVE_ID");return n?.skipForNonBuildsService&&a===f3i?{}:{Signature:e.builds.sig,"Signature-Input":e.builds.input,"Signature-Agent":e.builds.agent,"x-vercel-hive-id":a,"x-vercel-deployment-id":t.id,"x-vercel-owner-id":t.ownerId}}function Evr(e){return kee(e)?e.name==="TypeError"?"type_error":e.message.includes("ECONNRESET")?"econnreset":e.message.includes("EPROTO")?"eproto":e.message.includes("socket hang up")?"socket_hang_up":e.message.includes("network timeout at")?"network_timeout":e.messa
16:31:06.246                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
16:31:06.246 
16:31:06.247 b9 [Error]: The Edge Function "_middleware" size is 1.03 MB and your plan size limit is 1 MB.
16:31:06.247     at jji (/var/task/sandbox.js:999:21006)
16:31:06.247     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
16:31:06.247     at async Promise.all (index 0)
16:31:06.247     at async c1e.compileSources (/var/task/sandbox.js:999:22771)
16:31:06.247     at async WCr (/var/task/sandbox.js:999:25990) {
16:31:06.247   hideStackTrace: true,
16:31:06.248   code: 'NOW_SANDBOX_WORKER_MAX_MIDDLEWARE_SIZE',
16:31:06.248   link: 'https://vercel.link/edge-function-size',
16:31:06.248   action: 'Learn More'
16:31:06.248 }
16:31:06.248 
16:31:06.248 Node.js v20.20.2