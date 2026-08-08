export function TiletSeparator() {
  const svgContent = `<svg width='60' height='40' viewBox='0 0 60 40' xmlns='http://www.w3.org/2000/svg'><rect width='60' height='40' fill='%230f2416'/><rect x='0' y='2' width='60' height='2' fill='%23C7C466'/><rect x='0' y='36' width='60' height='2' fill='%23C7C466'/><path d='M0,6 L60,6 M0,34 L60,34' stroke='%23C7C466' stroke-width='1' stroke-dasharray='2,2'/><g fill='%23C7C466'><polygon points='15,10 22,20 15,30 8,20'/><polygon points='15,14 19,20 15,26 11,20' fill='%23141414'/><polygon points='45,10 52,20 45,30 38,20'/><polygon points='45,14 49,20 45,26 41,20' fill='%23141414'/></g><g stroke='%23C7C466' stroke-width='1.5' fill='none'><path d='M0,20 L5,15 M0,20 L5,25'/><path d='M30,20 L25,15 M30,20 L25,25'/><path d='M30,20 L35,15 M30,20 L35,25'/><path d='M60,20 L55,15 M60,20 L55,25'/></g></svg>`;
  
  return (
    <div 
      className="w-full h-8 md:h-10 relative z-20 shadow-xl"
      style={{
        backgroundImage: `url("data:image/svg+xml,${svgContent}")`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%'
      }}
      aria-hidden="true"
    />
  );
}
