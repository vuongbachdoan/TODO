export const InprogressIcon = ({ fill, size, height, width, ...props }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 96 960 960"
        fill={fill}
        {...props}
      >
        <path
          stroke={fill}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M250 604h461v-60H250v60Zm-70 332q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z"
        />
      </svg>
    </>
  );
};
