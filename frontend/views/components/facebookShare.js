function openInCenter(event, url) {
  event.preventDefault();
  const width = 800;
  const height = 600;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  window.open(
    url,
    '_blank',
    `width=${width}, height=${height}, left=${left}, top=${top}, resizable=yes, scrollbars=yes`
  );
}
