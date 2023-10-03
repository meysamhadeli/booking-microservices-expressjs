#!/bin/bash

PROTO_DIR="./src/grpcServer/proto"
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
GRPC_TOOLS_NODE_PROTOC_PLUGIN="./node_modules/.bin/grpc_tools_node_protoc_plugin"
GRPC_TOOLS_NODE_PROTOC="./node_modules/.bin/grpc_tools_node_protoc"

# Generate JS and corresponding TS d.ts codes for each .proto file using the grpc-tools for Node.
$GRPC_TOOLS_NODE_PROTOC \
    --js_out=import_style=commonjs,binary:"$PROTO_DIR" \
    --ts_out="$PROTO_DIR" \
    --grpc_out="$PROTO_DIR" \
    -I "$PROTO_DIR" \
    "$PROTO_DIR"/*.proto
