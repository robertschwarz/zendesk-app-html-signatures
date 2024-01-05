// @ts-ignore
import { component } from "reefjs";

export const awaitReefRender = (
 container: string,
 elementId: string,
 template: () => string,
 options?: {
  signals?: Array<string>,
  events?: object
 }
) => {
 document.addEventListener("reef:render", (e) => {
   if ((e.target as HTMLElement)?.id == container) {
     component(elementId, template, options);
   }
 });
};