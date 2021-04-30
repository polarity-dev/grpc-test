/* eslint-disable no-console */
const protoLoader = require("@grpc/proto-loader")
const grpc = require("@grpc/grpc-js")
const { join } = require("path")
const { promisify } = require("util")
const { PORT = 9999 } = process.env

const implementations = {
  sayHello: (call, callback) => {
    callback(null, {
      message: `Hello ${call.request.name}!`
    })
  }
}

const descriptor = grpc.loadPackageDefinition(protoLoader.loadSync(join(__dirname, "../proto/greeter.proto")))
const server = new grpc.Server()
server.bindAsync = promisify(server.bindAsync)
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure())
  .then(() => {
    server.addService(descriptor.greeter.Greeter.service, implementations)
    server.start()
    console.log("grpc server started on port %O", PORT)
  })
  .catch(console.log)
