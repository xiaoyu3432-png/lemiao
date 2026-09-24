const visuals: Record<string, { image: string; icon: string }> = {
  '篮球': { image: '/static/brand/basketball.jpg', icon: 'basketball' },
  '体适能': { image: '/static/brand/fitness.jpg', icon: 'fitness' },
  '跳绳': { image: '/static/brand/rope.jpg', icon: 'rope' }
};
export function courseVisual(category: string) {
  return visuals[category] || { image: '/static/brand/equipment.jpg', icon: 'fitness' };
}
