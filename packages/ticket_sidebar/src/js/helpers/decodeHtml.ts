/**
 * https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it
 * Converts HTML entities to HTML tags
 * an input string like "&lt;div&gt;" becomes "<div>"
 */
export const decodeHtml = (html: string): string => {
 const text: HTMLTextAreaElement = document.createElement("textarea");
 text.innerHTML = html;
 return text.value;
};