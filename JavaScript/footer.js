const footer = document.getElementById("footer");
const descripcionFooter = document.createElement("p");
const fechaActual = new Date().getFullYear();

descripcionFooter.innerHTML = "POYECTO FINAL | Facundo Figueroa Muñoz " + fechaActual;
footer.appendChild(descripcionFooter);
