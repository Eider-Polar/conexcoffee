// ==========================================================
// ConexCoffee — Banderas Vectoriales SVG (Estricto CERO EMOJIS)
// Renderizador escalable con fallback para cualquier país nuevo
// ==========================================================

export function CountryFlag({ codigoIso = '', pais = '', className = 'w-9 h-6' }) {
  const code = (codigoIso || '').toUpperCase().trim();

  switch (code) {
    case 'MX': // México
      return (
        <svg viewBox="0 0 640 480" className={className} xmlns="http://www.w3.org/2000/svg">
          <path fill="#006847" d="M0 0h213.3v480H0z" />
          <path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
          <path fill="#ce1126" d="M426.7 0H640v480H426.7z" />
          <circle cx="320" cy="240" r="38" fill="#8B5A2B" opacity="0.8" />
          <circle cx="320" cy="240" r="30" fill="#556B2F" opacity="0.9" />
          <path d="M312 230l8-12 8 12-4 20h-8z" fill="#d4af37" />
        </svg>
      );

    case 'CL': // Chile
      return (
        <svg viewBox="0 0 640 480" className={className} xmlns="http://www.w3.org/2000/svg">
          <path fill="#d52b1e" d="M0 240h640v240H0z" />
          <path fill="#fff" d="M240 0h400v240H240z" />
          <path fill="#0039a6" d="M0 0h240v240H0z" />
          <polygon
            points="120,60 135,105 180,105 144,132 158,175 120,148 82,175 96,132 60,105 105,105"
            fill="#fff"
          />
        </svg>
      );

    case 'BR': // Brasil
      return (
        <svg viewBox="0 0 640 480" className={className} xmlns="http://www.w3.org/2000/svg">
          <path fill="#009b3a" d="M0 0h640v480H0z" />
          <path fill="#fedf00" d="M320 50L580 240 320 430 60 240z" />
          <circle cx="320" cy="240" r="105" fill="#002776" />
          <path d="M218 250a108 108 0 0 0 204 -20" fill="none" stroke="#fff" strokeWidth="14" />
        </svg>
      );

    case 'CA': // Canadá
      return (
        <svg viewBox="0 0 640 480" className={className} xmlns="http://www.w3.org/2000/svg">
          <path fill="#d80621" d="M0 0h160v480H0zm480 0h160v480H480z" />
          <path fill="#fff" d="M160 0h320v480H160z" />
          <path
            d="M320 90l22 45 42-12-14 38 45 10-38 32 18 42-45-12-12 75h-36l-12-75-45 12 18-42-38-32 45-10-14-38 42 12z"
            fill="#d80621"
          />
        </svg>
      );

    case 'US': // Estados Unidos
      return (
        <svg viewBox="0 0 640 480" className={className} xmlns="http://www.w3.org/2000/svg">
          <path fill="#bd3d44" d="M0 0h640v480H0z" />
          <path
            fill="#fff"
            d="M0 37h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0z"
          />
          <path fill="#192f5d" d="M0 0h280v260H0z" />
          <circle cx="50" cy="50" r="10" fill="#fff" />
          <circle cx="110" cy="50" r="10" fill="#fff" />
          <circle cx="170" cy="50" r="10" fill="#fff" />
          <circle cx="230" cy="50" r="10" fill="#fff" />
          <circle cx="80" cy="90" r="10" fill="#fff" />
          <circle cx="140" cy="90" r="10" fill="#fff" />
          <circle cx="200" cy="90" r="10" fill="#fff" />
          <circle cx="50" cy="130" r="10" fill="#fff" />
          <circle cx="110" cy="130" r="10" fill="#fff" />
          <circle cx="170" cy="130" r="10" fill="#fff" />
          <circle cx="230" cy="130" r="10" fill="#fff" />
          <circle cx="80" cy="170" r="10" fill="#fff" />
          <circle cx="140" cy="170" r="10" fill="#fff" />
          <circle cx="200" cy="170" r="10" fill="#fff" />
          <circle cx="50" cy="210" r="10" fill="#fff" />
          <circle cx="110" cy="210" r="10" fill="#fff" />
          <circle cx="170" cy="210" r="10" fill="#fff" />
          <circle cx="230" cy="210" r="10" fill="#fff" />
        </svg>
      );

    case 'ES': // España
      return (
        <svg viewBox="0 0 640 480" className={className} xmlns="http://www.w3.org/2000/svg">
          <path fill="#aa151b" d="M0 0h640v480H0z" />
          <path fill="#f1bf00" d="M0 120h640v240H0z" />
          <rect x="120" y="180" width="60" height="80" rx="10" fill="#aa151b" />
          <circle cx="150" cy="200" r="12" fill="#f1bf00" />
        </svg>
      );

    case 'DE': // Alemania
      return (
        <svg viewBox="0 0 640 480" className={className} xmlns="http://www.w3.org/2000/svg">
          <path fill="#000" d="M0 0h640v160H0z" />
          <path fill="#dd0000" d="M0 160h640v160H0z" />
          <path fill="#ffce00" d="M0 320h640v160H0z" />
        </svg>
      );

    case 'JP': // Japón
      return (
        <svg viewBox="0 0 640 480" className={className} xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff" d="M0 0h640v480H0z" />
          <circle cx="320" cy="240" r="130" fill="#bc002d" />
        </svg>
      );

    case 'CO': // Colombia
      return (
        <svg viewBox="0 0 640 480" className={className} xmlns="http://www.w3.org/2000/svg">
          <path fill="#fcd116" d="M0 0h640v240H0z" />
          <path fill="#003893" d="M0 240h640v120H0z" />
          <path fill="#ce1126" d="M0 360h640v120H0z" />
        </svg>
      );

    default:
      // Fallback universal para cualquier país nuevo registrado dinámicamente por el SuperAdmin
      return (
        <div
          className={`${className} flex items-center justify-center bg-brand-terracota text-white font-black text-xs rounded-xs uppercase tracking-wider shadow-inner select-none`}
          title={pais || code}
        >
          {code.slice(0, 2) || (pais ? pais.slice(0, 2).toUpperCase() : 'GL')}
        </div>
      );
  }
}

export default CountryFlag;
