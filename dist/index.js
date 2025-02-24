"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const app = (0, express_1.default)();
const port = 3000;
// OpenAPI specification
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Simple API',
            version: '1.0.0',
            description: 'A simple Express API with OpenAPI specification',
        },
        servers: [
            {
                url: `https://api-d33i.onrender.com`,
                description: 'Development server',
            },
        ],
    },
    apis: [__filename], // Path to the API docs
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Serve OpenAPI UI
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Expose OpenAPI spec as JSON
app.get('/api-spec.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
/**
 * @openapi
 * /data:
 *   get:
 *     summary: Returns content data
 *     description: Returns a JSON object containing content data
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *                   example: some content
 */
app.get('/', (req, res) => {
    res.send(`
    <h1>Simple TypeScript API</h1>
    <p>Available endpoints:</p>
    <ul>
      <li><a href="/data">/data - Get content data</a></li>
      <li><a href="/api-docs">/api-docs - API documentation</a></li>
      <li><a href="/api-spec.json">/api-spec.json - OpenAPI specification</a></li>
    </ul>
  `);
});
app.get('/data', (req, res) => {
    console.log('Received request');
    res.json({ content: 'some content extra' });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`API documentation available at http://localhost:${port}/api-docs`);
});
