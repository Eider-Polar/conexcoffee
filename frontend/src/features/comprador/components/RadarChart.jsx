// ============================================
// RadarChart — Gráfica de telaraña SVG pura
// ============================================
// Sin dependencias externas. Renderiza un polígono
// radial con los atributos sensoriales del café.
// ============================================

const COLORS = {
  stroke: '#14b8a6',   // teal-500
  fill: '#14b8a650',   // teal-500 con opacidad
  grid: '#e2e8f0',     // surface-200
  label: '#64748b',    // surface-500
  axis: '#cbd5e1',     // surface-300
};

export default function RadarChart({ data, size = 280 }) {
  const entries = Object.entries(data);
  const total = entries.length;
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.36;
  const labelRadius = size * 0.47;
  const levels = 5;           // círculos concéntricos
  const maxValue = 10;

  // Calcular ángulo para cada eje
  const angle = (index) => (Math.PI * 2 * index) / total - Math.PI / 2;

  // Convertir valor a coordenadas
  const valueToCoords = (value, index) => {
    const r = (value / maxValue) * maxRadius;
    const a = angle(index);
    return {
      x: cx + r * Math.cos(a),
      y: cy + r * Math.sin(a),
    };
  };

  // Coordenadas del polígono de datos
  const dataPoints = entries.map(([, val], i) => valueToCoords(val, i));
  const polygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // Círculos de escala
  const gridCircles = Array.from({ length: levels }, (_, i) => {
    const r = ((i + 1) / levels) * maxRadius;
    return (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={COLORS.grid}
        strokeWidth={1}
      />
    );
  });

  // Líneas de ejes
  const axes = entries.map((_, i) => {
    const end = valueToCoords(maxValue, i);
    return (
      <line
        key={i}
        x1={cx}
        y1={cy}
        x2={end.x}
        y2={end.y}
        stroke={COLORS.axis}
        strokeWidth={1}
      />
    );
  });

  // Etiquetas de ejes + valores de escala en el eje superior
  const labels = entries.map(([label], i) => {
    const a = angle(i);
    const lx = cx + labelRadius * Math.cos(a);
    const ly = cy + labelRadius * Math.sin(a);
    const anchor =
      Math.abs(a) < 0.1 ? 'middle' :
      lx > cx + 5 ? 'start' :
      lx < cx - 5 ? 'end' : 'middle';
    return (
      <text
        key={i}
        x={lx}
        y={ly}
        textAnchor={anchor}
        dominantBaseline="middle"
        fontSize={9.5}
        fill={COLORS.label}
        fontFamily="system-ui, sans-serif"
      >
        {label}
      </text>
    );
  });

  // Números de escala en el eje superior (0°)
  const scaleLabels = Array.from({ length: levels }, (_, i) => {
    const val = ((i + 1) / levels) * maxValue;
    const r = ((i + 1) / levels) * maxRadius;
    return (
      <text
        key={i}
        x={cx + 4}
        y={cy - r + 2}
        fontSize={8}
        fill={COLORS.label}
        fontFamily="system-ui, sans-serif"
      >
        {val.toFixed(0)}
      </text>
    );
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid */}
      {gridCircles}
      {axes}
      {scaleLabels}

      {/* Polígono de datos */}
      <polygon
        points={polygonPoints}
        fill={COLORS.fill}
        stroke={COLORS.stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* Puntos en los vértices */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill={COLORS.stroke} />
      ))}

      {/* Etiquetas */}
      {labels}
    </svg>
  );
}
