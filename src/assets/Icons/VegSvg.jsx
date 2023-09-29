import * as React from "react"
const SvgComponent = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={17}
    fill="none"
    className={`w-fit cursor-pointer transition-all duration-200  transform active:scale-95 ${props.className}`}
  >
    <path
      fill="var(--primary-success-color)"
      d="M13.997 1.834c.92 0 1.667.746 1.667 1.666v10c0 .92-.746 1.667-1.667 1.667h-10c-.92 0-1.666-.746-1.666-1.667v-10c0-.92.746-1.666 1.666-1.666h10Zm3.334 0c0-.92-.747-1.667-1.667-1.667H2.331C1.41.167.664.913.664 1.834v13.333c0 .92.746 1.667 1.667 1.667h13.333c.92 0 1.667-.747 1.667-1.667V1.834ZM8.997 3.5c-2.758 0-5 2.242-5 5 0 2.759 2.242 5 5 5 2.759 0 5-2.241 5-5 0-2.758-2.241-5-5-5Z"
    />
  </svg>
)
export default SvgComponent
