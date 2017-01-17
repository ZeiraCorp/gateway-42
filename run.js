#!/usr/bin/env node

"use strict";

require('shelljs/global');

[...Array(3).keys()].forEach(key => exec(
    `SERVICE_ID="gateway-42-${key}" PORT=${8181+key} MAPPED_PORT=${8181+key} HOST="localhost" REDIS_URL="redis://localhost:6379" node index.js`
  , (code, stdout, stderr) => {})
)
