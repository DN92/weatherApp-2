import { useMemo } from 'react';
import useWindowSize from './useWindowSize';

interface Sizer {
  maxSize: number,
  name: string,
}

interface BreakPoints {
  xs: Sizer,
  sm: Sizer,
  md: Sizer,
  lg: Sizer,
  xl: Sizer,
}

const defaultBreakPoints: BreakPoints = {
  xs: { maxSize: 480, name: 'xs' },
  sm: { maxSize: 768, name: 'sm' },
  md: { maxSize: 1024, name: 'md' },
  lg: { maxSize: 1280, name: 'lg' },
  xl: { maxSize: Infinity, name: 'xl' },
};

const useMediaQuery = ({ xs, sm, md, lg, xl }: BreakPoints = defaultBreakPoints): Sizer => {
  const { width } = useWindowSize();
  const screenSizer = useMemo(() => {
    if (!width && width !== 0) return md.name;
    if (width < xs.maxSize) return xs;
    if (width < sm.maxSize) return sm;
    if (width < md.maxSize) return md;
    if (width < lg.maxSize) return lg;
    if (width < xl.maxSize) return xl;
    // default
    return md;
  }, [width, xs, sm, md, lg, xl]);
  return screenSizer as Sizer;
};

export default useMediaQuery;
