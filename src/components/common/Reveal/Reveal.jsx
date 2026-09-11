import { useInView } from '../../../hooks';

/**
 * Reveal — wraps children with a scroll-triggered fade-up animation.
 * Props:
 *   children   — content to animate
 *   className  — additional CSS class(es)
 *   delay      — animation delay class: 'd1' | 'd2' | 'd3' | 'd4'
 */
export default function Reveal({ children, className = '', delay = '' }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`reveal ${visible ? 'on' : ''} ${delay} ${className}`}>
      {children}
    </div>
  );
}
