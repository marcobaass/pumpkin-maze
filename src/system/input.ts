const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  // cursor.x = event.clientX / window.innerWidth - 0.5;
  // cursor.y = event.clientY / window.innerHeight - 0.5;
  cursor.x = event.clientX;
  cursor.y = event.clientY;
});

export { cursor };
