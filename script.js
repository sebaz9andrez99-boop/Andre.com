
/* =========================================
   REPOSTERÍA VERITO
   Funciones interactivas
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. MENÚ RESPONSIVE

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Cerrar menú" : "Abrir menú"
            );

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", event => {
            if (
                navMenu.classList.contains("open") &&
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        // Cerrar menú con Escape
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }


    // 2. AÑO AUTOMÁTICO DEL FOOTER

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // 3. FECHA MÍNIMA PARA EL PEDIDO

    const dateInput = document.getElementById("fecha");

    if (dateInput) {
        const today = new Date();

        const localToday = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, "0"),
            String(today.getDate()).padStart(2, "0")
        ].join("-");

        dateInput.min = localToday;
    }



/* 4. FORMULARIO DE COTIZACIÓN POR WHATSAPP */

const quoteForm = document.getElementById("quote-form");

if (quoteForm) {
    quoteForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!quoteForm.reportValidity()) return;

        const nombre = document.getElementById("nombre").value.trim();
        const producto = document.getElementById("producto").value;
        const fecha = document.getElementById("fecha").value;
        const detalle = document.getElementById("detalle").value.trim();

        if (!nombre || !producto || !fecha) {
            alert("Completa tu nombre, producto y fecha del pedido.");
            return;
        }

        // TU LINK DIRECTO DE WHATSAPP
        const miWhatsApp = "https://wa.me/51993782852";

        const mensaje =
            `¡Hola, Repostería Verito! 🎂 Quiero cotizar.\n\n` +
            `Nombre: ${nombre}\n` +
            `Producto: ${producto}\n` +
            `Fecha del pedido: ${fecha}\n` +
            `Detalles: ${detalle || "No especificados"}\n\n` +
            `Quedo atento/a al precio. ¡Gracias!`;

        const enlaceWhatsApp =
            miWhatsApp + "?text=" + encodeURIComponent(mensaje);

        window.location.href = enlaceWhatsApp;
    });
}

});

/* BOTON FLOTANTE DE WHATSAPP */

.whatsapp-float {
    position: fixed;
    right: 20px;
    bottom: 20px;

    width: 60px;
    height: 60px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #25D366;
    color: #ffffff;

    border-radius: 50%;
    text-decoration: none;
    font-size: 34px;

    box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);

    z-index: 9999;

    animation: whatsappMove 3s ease-in-out infinite;

    transition: transform 0.3s ease,
                box-shadow 0.3s ease;
}

/* MOVIMIENTO SUAVE */

@keyframes whatsappMove {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-8px);
    }

    100% {
        transform: translateY(0);
    }
}

/* EFECTO AL PASAR EL MOUSE */

.whatsapp-float:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 22px rgba(37, 211, 102, 0.6);
}

/* EFECTO AL HACER CLIC */

.whatsapp-float:active {
    transform: scale(0.95);
}

/* AJUSTE PARA CELULARES */

@media (max-width: 600px) {
    .whatsapp-float {
        width: 54px;
        height: 54px;
        right: 15px;
        bottom: 15px;
        font-size: 30px;
    }
}

/* ACCESIBILIDAD */

@media (prefers-reduced-motion: reduce) {
    .whatsapp-float {
        animation: none;
    }
}
