export const DoneIcon = ({ fill, size, height, width, ...props }) => {
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
          d="M351 936q-97 0-164-67t-67-164V447q0-97 67-164t164-67h258q97 0 164 67t67 164v258q0 97-67 164t-164 67H351Zm88-205 240-240-43-43-197 197-97-97-43 43 140 140Zm-88 145h258q71 0 121-50t50-121V447q0-71-50-121t-121-50H351q-71 0-121 50t-50 121v258q0 71 50 121t121 50Zm129-300Z"
        />
      </svg>
    </>
  );
};
