import { FC } from 'react';

type LogoProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
};

export const Logo: FC<LogoProps> = ({ width = '128px', height = '128px', fill = '#000000', className = '' }) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 128.000000 128.000000"
    preserveAspectRatio="xMidYMid meet"
    className={className}>
    <g transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)" fill={fill} stroke="none">
      <path
        d="M586 1215 c-71 -29 -118 -72 -154 -140 -24 -45 -27 -61 -27 -147 1
-54 -1 -98 -2 -98 -2 0 -7 10 -12 23 -5 12 -23 41 -40 65 -25 33 -37 42 -61
42 -33 0 -31 4 -49 -123 -6 -45 -24 -109 -42 -150 -131 -297 108 -647 441
-647 223 0 428 170 470 389 25 131 4 323 -45 421 -24 48 -105 130 -128 130
-25 0 -37 -25 -37 -79 l0 -55 -27 31 c-16 16 -47 45 -71 63 -51 38 -72 76 -72
127 0 34 11 58 52 116 40 55 -89 77 -196 32z m140 -470 c64 -19 128 -73 162
-139 37 -71 38 -179 2 -250 -91 -178 -329 -207 -461 -57 -97 109 -90 271 16
376 77 78 174 102 281 70z"
      />
      <path
        d="M572 669 c-48 -14 -109 -80 -123 -131 -23 -89 12 -182 88 -229 57
-36 154 -34 210 3 62 41 88 90 88 168 0 77 -26 127 -85 166 -43 29 -125 39
-178 23z m108 -121 c0 -49 3 -55 47 -100 l47 -48 -27 -27 -27 -27 -60 59 -60
59 0 68 0 68 40 0 40 0 0 -52z"
      />
    </g>
  </svg>
);
