/* eslint-disable no-restricted-syntax */
export default function schemaToObject(schema) {
   for (const [key] of Object.entries(schema)) {
      if (key.charAt(0) === key.charAt(0).toUpperCase()) {
         delete schema[key];
      }
   }
}
