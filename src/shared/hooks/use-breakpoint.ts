import { useMediaQuery } from 'usehooks-ts';

export enum Breakpoint {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  LAPTOP = 'laptop',
  DESKTOP = 'desktop'
}
const params = {
  [Breakpoint.MOBILE]: 640,
  [Breakpoint.TABLET]: 768,
  [Breakpoint.LAPTOP]: 1024,
  [Breakpoint.DESKTOP]: 1280
};

export function useIsLaptop() {
  return useMediaQuery(`(max-width: ${params[Breakpoint.LAPTOP]}px)`);
}

export function useIsTablet() {
  return useMediaQuery(`(max-width: ${params[Breakpoint.TABLET]}px)`);
}

export function useIsMobile() {
  return useMediaQuery(`(max-width: ${params[Breakpoint.MOBILE]}px)`);
}

export function useIsDesktop() {
  return useMediaQuery(`(max-width: ${params[Breakpoint.DESKTOP]}px)`);
}

export function useBreakpoint() {
  return {
    isMobile: useIsMobile(),
    isTablet: useIsTablet(),
    isLaptop: useIsLaptop(),
    isDesktop: useIsDesktop()
  };
}
