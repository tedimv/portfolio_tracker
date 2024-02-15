export function getThemeProperty(varName: string) {
    const styled = getComputedStyle(document.body);
    return styled.getPropertyValue(`--${varName}`);
}
