export const openSmallWindow = (shareUrl: string) => {
  window.open(
    shareUrl,
    '_blank',
    'width=600,height=400,scrollbars=no,toolbar=no,menubar=no,resizable=no'
  );
}