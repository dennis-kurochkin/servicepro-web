---
to: "src/<%= path ? `features/${path}/components` : `components` %>/<%= name %>/index.ts"
---
export * from './<%= name %>'
