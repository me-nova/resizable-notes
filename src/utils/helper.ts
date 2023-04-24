export const elementsOverlap = (trashElement: HTMLElement | null, cardElement: HTMLElement | null) => {
  if ( !trashElement || !cardElement) return
  const trash = trashElement.getBoundingClientRect();
  const card = cardElement.getBoundingClientRect();

  return !(
    trash.top > card.bottom ||
    trash.right < card.left ||
    trash.bottom < card.top ||
    trash.left > card.right
  );
}
