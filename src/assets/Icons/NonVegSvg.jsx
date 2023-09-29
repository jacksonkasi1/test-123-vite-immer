import * as React from "react"
const SvgComponent = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    className={`w-fit cursor-pointer transition-all duration-200  transform active:scale-95 ${props.className}`}
  >
    <g clipPath="url(#a)">
      <rect width={18} height={18} fill="var(--primary-white-color)" rx={2} />
      <path
        fill="var(--primary-danger-color)"
        d="M14.403 1.8a1.8 1.8 0 0 1 1.801 1.8v10.803a1.8 1.8 0 0 1-1.8 1.801H3.6a1.8 1.8 0 0 1-1.8-1.8V3.6a1.8 1.8 0 0 1 1.8-1.8h10.802Zm3.601 0a1.8 1.8 0 0 0-1.8-1.8H1.8A1.8 1.8 0 0 0 0 1.8v14.404a1.8 1.8 0 0 0 1.8 1.8h14.404a1.8 1.8 0 0 0 1.8-1.8V1.8Z"
      />
      <path
        fill="var(--primary-danger-color)"
        d="M7.99 4.75a1.167 1.167 0 0 1 2.02 0l4.042 7c.449.778-.112 1.75-1.01 1.75H4.958c-.899 0-1.46-.972-1.01-1.75l4.04-7Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <rect width={18} height={18} fill="var(--primary-white-color)" rx={2} />
      </clipPath>
    </defs>
  </svg>
)
export default SvgComponent
