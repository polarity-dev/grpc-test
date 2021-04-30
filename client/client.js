/* eslint-disable no-console */
const protoLoader = require("@grpc/proto-loader")
const grpc = require("@grpc/grpc-js")
const { join } = require("path")
const descriptor = grpc.loadPackageDefinition(protoLoader.loadSync(join(__dirname, "../proto/greeter.proto")))
const grpcClient = new descriptor.greeter.Greeter("0.0.0.0:9999", grpc.credentials.createInsecure())

grpcClient.sayHello({ name: "Gio" }, (err, data) => {
  console.log({ err, data })
})
