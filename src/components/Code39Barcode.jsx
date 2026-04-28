import React from 'react';

const code39Patterns = {
  0: '101001101101',
  1: '110100101011',
  2: '101100101011',
  3: '110110010101',
  4: '101001101011',
  5: '110100110101',
  6: '101100110101',
  7: '101001011011',
  8: '110100101101',
  9: '101100101101',
  A: '110101001011',
  B: '101101001011',
  C: '110110100101',
  D: '101011001011',
  E: '110101100101',
  F: '101101100101',
  G: '101010011011',
  H: '110101001101',
  I: '101101001101',
  J: '101011001101',
  K: '110101010011',
  L: '101101010011',
  M: '110110101001',
  N: '101011010011',
  O: '110101101001',
  P: '101101101001',
  Q: '101010110011',
  R: '110101011001',
  S: '101101011001',
  T: '101011011001',
  U: '110010101011',
  V: '100110101011',
  W: '110011010101',
  X: '100101101011',
  Y: '110010110101',
  Z: '100110110101',
  '-': '100101011011',
  '.': '110010101101',
  ' ': '100110101101',
  '*': '100101101101',
};

export default function Code39Barcode({ value, height = 70 }) {
  const safeValue = String(value || '00000').toUpperCase().replace(/[^A-Z0-9 .-]/g, '');
  const encoded = `*${safeValue}*`;
  const bars = [];
  let x = 0;

  encoded.split('').forEach((char) => {
    const pattern = code39Patterns[char] || code39Patterns['0'];
    pattern.split('').forEach((bit, index) => {
      const width = bit === '1' ? 3 : 1;
      if (index % 2 === 0) {
        bars.push({ x, width });
      }
      x += width;
    });
    x += 2;
  });

  return (
    <svg viewBox={`0 0 ${x} ${height}`} className="h-20 w-full" role="img" aria-label={`باركود ${safeValue}`}>
      <rect width={x} height={height} fill="#fff" rx="4" />
      {bars.map((bar, index) => (
        <rect key={`${bar.x}-${index}`} x={bar.x} y="8" width={bar.width} height={height - 22} fill="#050816" />
      ))}
      <text x={x / 2} y={height - 4} fill="#050816" fontSize="10" textAnchor="middle" fontFamily="monospace">
        {safeValue}
      </text>
    </svg>
  );
}
