import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,ts,mjs,cjs,mts,cts}"],
    languageOptions: {
      globals: {
        ...globals.node
      },
      ecmaVersion: 2021,
      sourceType: "module"
    },
    plugins: {
      js,
      prettier: pluginPrettier
    },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": ["error",
    
        {
          "semi": false,
          "singleQuote": true
        }

      ] 
    }
  },

  // TypeScript recommended rules
  tseslint.configs.recommended,

  // Config Prettier (désactive les conflits potentiels)
  {
    rules: {
      ...prettier.rules
    }
  }
]);
