# --- STAGE 1 — Build des dependances ---
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# --- STAGE 2 — RUNTIME ---

FROM node:20-slim AS production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/src ./src

COPY --from=build /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "src/server.js"]
