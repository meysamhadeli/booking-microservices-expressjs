# syntax=docker/dockerfile:1.6

###############################################
# Stage 1 — build building-blocks (shared lib) #
###############################################
# building-blocks has no outDir and no root index.js; its package.json points
# "main" to "index.js" but the file only exists after `tsc` emits in-place.
# Each service depends on file:../building-blocks, so the sibling folder MUST
# already be compiled before the service can resolve its imports at runtime.
FROM node:22-alpine AS building-blocks

WORKDIR /app/building-blocks

# Install building-blocks dev dependencies (tsc, tsoa, etc.)
# Note: this repo does not commit package-lock.json files (they are .gitignored).
# We use `npm install` rather than `npm ci` to match the existing project workflow.
COPY building-blocks/package.json ./
RUN npm install

# Compile building-blocks — emits .js / .d.ts / .js.map alongside .ts sources
COPY building-blocks/ ./
RUN npm run build


###############################################
# Stage 2 — install passenger service deps     #
###############################################
FROM node:22-alpine AS deps

WORKDIR /app/passenger

# Install service dependencies. The "building-blocks": "file:../building-blocks"
# link in package.json resolves against /app/building-blocks, which we copy
# from the previous stage (already compiled). The folder is required on disk
# at install time. We use `npm install` to match the project's existing
# workflow (no package-lock.json is committed).
COPY passenger/package.json ./
COPY --from=building-blocks /app/building-blocks /app/building-blocks
RUN npm install


###############################################
# Stage 3 — build passenger service (tsc)     #
###############################################
FROM node:22-alpine AS builder

WORKDIR /app/passenger

# Reuse the already-installed node_modules (cheaper than re-installing).
# The "file:../building-blocks" symlink inside points to /app/building-blocks.
COPY --from=deps /app/passenger/node_modules ./node_modules

# Copy the compiled building-blocks folder so the symlink target exists in
# this stage. Without this, tsc follows the symlink to a missing path and
# every "building-blocks/*" import (and the auto-generated
# "./../../../building-blocks/jwt/jwt" import in routes.ts) fails to resolve.
COPY --from=building-blocks /app/building-blocks /app/building-blocks

# Copy the service source.
COPY passenger/ ./

# tsc emits to ./dist per tsconfig.json (outDir: "./dist").
# Result: dist/passenger/src/app.js is the runtime entrypoint.
RUN npm run build


###############################################
# Stage 4 — production runtime                #
###############################################
FROM node:22-alpine AS runner

# Alpine ships with a "node" user/group, but the workspace is owned by root
# by default. Create the dir as root and hand it to the unprivileged user.
WORKDIR /app/passenger

ENV NODE_ENV=production \
    NODE_OPTIONS=--enable-source-maps \
    # When `tsc` compiles this service, it walks the file:../building-blocks
    # symlink in node_modules and emits compiled output into
    # dist/passenger/.../. Those compiled files do `require('bcryptjs')` etc.
    # but their module resolution root is /app/passenger/dist/, not
    # /app/passenger/. NODE_PATH lets Node find bcryptjs (from building-blocks'
    # deps) and any other transitive dep without copying node_modules into dist.
    NODE_PATH=/app/passenger/node_modules:/app/building-blocks/node_modules

# Order matters here: copy /app/building-blocks BEFORE the service's
# node_modules, because the "file:../building-blocks" symlink inside
# node_modules points to that path. If we copied node_modules first, the
# symlink would be dangling until the next layer created its target.
COPY --from=building-blocks --chown=node:node /app/building-blocks /app/building-blocks

# Copy the compiled service from the builder stage
COPY --from=builder --chown=node:node /app/passenger/dist ./dist

# Swagger is loaded from process.cwd()/src/docs/swagger.json when NODE_ENV is
# development, so the runtime image must include the generated spec file.
COPY --from=builder --chown=node:node /app/passenger/src/docs ./src/docs

# Copy passenger's node_modules (decorators, reflect-metadata, tsyringe, tsoa
# runtime are all required at runtime; we keep dev deps here for now to
# avoid a package.json change that would expand the scope of this PR).
# NODE_PATH (set in ENV above) makes building-blocks' own node_modules
# visible too, so we don't need a separate COPY for those.
COPY --from=deps --chown=node:node /app/passenger/node_modules ./node_modules

USER node

EXPOSE 3355

# Healthcheck: each Express app responds 200 on GET / with the service name.
# wget is present in the node:alpine image; no extra install required.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:3355/ || exit 1

CMD ["node", "dist/passenger/src/app.js"]
