export type T_ResourceType = "image" | "audio" | "video";

export function loadResource(
  type: T_ResourceType,
  path: string,
  onLoad?: () => void
) {
  return new Promise((resolve, reject) => {
    let element;
    switch (type) {
      case "image":
        element = new Image();
        break;
      case "audio":
        element = new Audio();
        break;
      case "video":
        element = document.createElement("video");
        break;
    }

    element.src = path;
    element.onload = () => {
      onLoad?.();
      document.getElementById("resource")!.removeChild(element!);
      return resolve(path);
    };
    element.onerror = () => {
      document.getElementById("resource")!.removeChild(element!);
      return reject(path);
    };
    document.getElementById("resource")!.appendChild(element);
  });
}
