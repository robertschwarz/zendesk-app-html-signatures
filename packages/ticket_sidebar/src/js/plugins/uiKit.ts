type tooltipPosition = "top" | "bottom" | "left" | "right";

export class uiKitHelper {
  makeTooltip(text: string, position?: tooltipPosition): string {
    const tooltipAttribute = "uk-tooltip=";
    const tooltipText = `"title:${text};${position ? ";pos:" + position : ""}"`;

    return tooltipAttribute + tooltipText;
  }
}
