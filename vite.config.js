import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import obfuscatorPlugin from 'rollup-plugin-obfuscator';

const basePath = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base: basePath,
  plugins: [react()],
  resolve: {
    alias: {
      '@': process.cwd() + '/src',
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        obfuscatorPlugin({
          options: {
            compact: true,
            controlFlowFlattening: false,
            controlFlowFlatteningThreshold: 0.5,
            deadCodeInjection: false,
            deadCodeInjectionThreshold: 0.4,
            debugProtection: false,
            disableConsoleOutput: true,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            numbersToExpressions: true,
            renameGlobals: false,
            selfDefending: false,
            simplify: true,
            splitStrings: true,
            splitStringsChunkLength: 10,
            stringArray: true,
            stringArrayCallsTransform: true,
            stringArrayEncoding: ['base64'],
            stringArrayIndexShift: true,
            stringArrayRotate: true,
            stringArrayShuffle: true,
            stringArrayWrappersCount: 2,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersParametersMaxCount: 4,
            stringArrayWrappersType: 'function',
            stringArrayThreshold: 0.75,
            transformObjectKeys: true,
            unicodeEscapeSequence: false
          }
        })
      ]
    }
  }
});
