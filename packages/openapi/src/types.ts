import type { OpenAPIV3 as OpenAPI } from 'openapi-types';
import { type Renderer } from '@/render/renderer';
import type { Endpoint } from '@/endpoint';
import type { CodeSample } from '@/render/operation';

export interface RouteInformation {
  path: string;
  summary?: string;
  description?: string;
  methods: MethodInformation[];
}

export interface MethodInformation extends OpenAPI.OperationObject {
  parameters: OpenAPI.ParameterObject[];
  method: string;
}

type Awaitable<T> = T | Promise<T>;

export interface RenderContext {
  renderer: Renderer;
  document: OpenAPI.Document;
  baseUrl: string;

  /**
   * Generate TypeScript definitions from response schema.
   *
   * Pass `false` to disable it.
   *
   * @param endpoint - the API endpoint
   * @param code - status code
   */
  generateTypeScriptSchema?:
    | ((endpoint: Endpoint, code: string) => Awaitable<string>)
    | false;

  /**
   * Generate code samples for endpoint.
   */
  generateCodeSamples?: (endpoint: Endpoint) => Awaitable<CodeSample[]>;
}
