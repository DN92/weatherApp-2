import { useMemo } from 'react';
import useWindowSize from './useWindowSize';

interface sizer {
  maxSize: number,
  name: string,
}

interface breakPoints {
  xs: sizer,
  sm: sizer,
  md: sizer,
  lg: sizer,
  xl: sizer,
}

const defaultBreakPoints: breakPoints = {
  xs: { maxSize: 480, name: 'xs' },
  sm: { maxSize: 768, name: 'sm' },
  md: { maxSize: 1024, name: 'md' },
  lg: { maxSize: 1280, name: 'lg' },
  xl: { maxSize: Infinity, name: 'xl' },
};

const useMediaQuery = ({ xs, sm, md, lg, xl }: breakPoints = defaultBreakPoints): sizer => {
  const { width } = useWindowSize();
  const screenSizer = useMemo(() => {
    if (!width && width !== 0) return md.name;
    if (width < xs.maxSize) return xs;
    if (width < sm.maxSize) return sm;
    if (width < md.maxSize) return md;
    if (width < lg.maxSize) return lg;
    if (width < xl.maxSize) return xl;
  }, [width, xs, sm, md, lg, xl]);
  return screenSizer as sizer;
};

export default useMediaQuery;
