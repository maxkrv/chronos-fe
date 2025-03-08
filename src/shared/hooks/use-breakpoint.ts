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

export function useLaptop() {
  return useMediaQuery(`(min-width: ${params[Breakpoint.LAPTOP]}px)`);
}

export function useTablet() {
  return useMediaQuery(`(min-width: ${params[Breakpoint.TABLET]}px)`);
}

export function useMobile() {
  return useMediaQuery(`(min-width: ${params[Breakpoint.MOBILE]}px)`);
}

export function useDesktop() {
  return useMediaQuery(`(min-width: ${params[Breakpoint.DESKTOP]}px)`);
}

export function useBreakpoint() {
  return {
    isMobile: useMobile(),
    isTablet: useTablet(),
    isLaptop: useLaptop(),
    isDesktop: useDesktop()
  };
}
