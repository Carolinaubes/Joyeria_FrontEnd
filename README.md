# 💎 Joyería — Frontend

Interfaz web desarrollada en **HTML, CSS y JavaScript** que consume la API REST del proyecto Joyería para mostrar y gestionar la información del sistema.

---

## 🏗️ Estructura del Proyecto

```
├── contenido/            # Recursos estáticos: imágenes e iconos
├── css/
│   └── styles.css        # Estilos de la interfaz
├── html/
│   └── index.html        # Vista principal
├── js/
│   └── script.js         # Lógica y consumo de la API
└── README.md
```

---

## ⚙️ Tecnologías

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**

---

## 🔗 Conexión con la API

Este proyecto consume la API REST del backend de Joyería. Asegúrate de tener el backend corriendo antes de usar el frontend.

👉 Repositorio Backend: [Joyeria_Backend](https://github.com/Carolinaubes/Joyeria_Backend)

Para apuntar al backend, verifica la URL base en `script.js`:
```javascript
const API_URL = "http://localhost:puerto-adecuado/api"; // Se cambia el puerto según sea necesario
```

---

## 🚀 Ejecución

Por ser un proyecto en HTML puro, simplemente abre el archivo en tu navegador:

```
html/index.html
```

O usa la extensión **Live Server** de VS Code para una mejor experiencia de desarrollo.
