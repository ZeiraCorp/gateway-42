const seneca = require('seneca')()
const port = process.env.PORT || 8081
const mapped_port = process.env.MAPPED_PORT || 8081 // Clever Cloud -> 80
const host = process.env.HOST || 'localhost' // domain name

const rediscli = require("redis").createClient({
  url:process.env.REDIS_URL
});

const service_id = process.env.SERVICE_ID || "gateway-42-service"

console.log("=== CC Special environment variables ===")
console.log("APP_ID", process.env.APP_ID)
console.log("INSTANCE_ID", process.env.INSTANCE_ID)
console.log("INSTANCE_TYPE", process.env.INSTANCE_TYPE)
console.log("COMMIT_ID", process.env.COMMIT_ID)
console.log("APP_HOME", process.env.APP_HOME)
console.log("INSTANCE_NUMBER", process.env.INSTANCE_NUMBER)
console.log("IGNORE_FROM_BUILDCACHE", process.env.IGNORE_FROM_BUILDCACHE)
console.log("========================================")

function yo(options) {
  this.add({role: "hello", cmd: "yo"}, (message, reply) => {
    reply(null, {answer: "yo 🌍❗️"})
  })
}

function math(options) {
  this.add({role: "math", cmd: "sum"}, (msg, reply) => {
    reply(null, {answer: (msg.a + msg.b)})
  })

  this.add({role: "math", cmd: "product"}, (msg, reply) => {
    reply(null, {answer: (msg.a * msg.b)})
  })
}

seneca
  .use(yo)
  .use(math)
  .listen({
    host: '0.0.0.0',
    port: port
  })

rediscli.set(service_id, JSON.stringify({
  host: host, port: mapped_port
}));

console.info(`🌍 service ${service_id} is listening on ${host}:${mapped_port}`)

// tests on CC: http://yoservicedemo.cleverapps.io/act?role=hello&cmd=yo
