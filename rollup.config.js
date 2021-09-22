import { defineConfig } from "rollup";

import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";

export default defineConfig([
  {
    plugins: [
      typescript(),
      terser(),
      copy({ targets: [{ src: "public/*", dest: "build" }] }),
      nodeResolve({ browser: true }),
      commonjs(),
    ],
    input: "src/content_scripts/calendar.ts",
    output: {
      file: "build/static/content.js",
      format: "iife",
    },
  },
  {
    plugins: [
      typescript(),
      terser(),
      nodeResolve({ browser: true }),
      postcss({ extensions: [".css"] }),
      commonjs(),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
    ],
    input: "src/index.tsx",
    output: {
      file: "build/static/min.js",
      format: "iife",
    },
  },
]);
